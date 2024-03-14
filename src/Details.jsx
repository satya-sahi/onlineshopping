import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import './App.css';
import PageNotFound from "./PageNotFound";
import { UseCart } from "./cartContext";

export default function Details() {

    const { dispatch } = UseCart();
    const [sku, setSku] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: product, error, loading } = useFetch(id);

    if (loading) return <Spinner />
    if (!product) return <PageNotFound />
    if (error) throw error;
    product.image_url = 'https://picsum.photos/200/300'
    return (
        <div id="detail">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p id="price">{product.price}</p>
            <select id="size" value={sku} onChange={(e) => (setSku(e.target.value))} >
                <option value="">Select SKU</option>
                {product.sku.map(s => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>
            <p><button className="btn btn-primary" disabled={!sku}
                onClick={() => {
                    dispatch({ type: "addCart", id, sku })
                    navigate("/cart")
                }} >
                Add to Cart</button></p>
            <img src={product.image_url} alt={product.name} />
        </div>
    )
}