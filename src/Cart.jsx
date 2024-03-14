import React,{useContext} from "react";
import useFetchAll from "./services/useFetchAll";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { UseCart } from "./cartContext";

export default function Cart() {
  const {cart, dispatch} = UseCart()
  const urls = cart.map((i) => i.id);
  const navigate  = useNavigate();
  const { data: products, loading, error } = useFetchAll(urls);
  function renderItem(itemInCart) {
    const { id, sku, quantity } = itemInCart;
    const { price, name, skus } = products.find(
      (p) => p.id === id
    );

    return (
      <li key={sku} className="cart-item">
        <img src='https://picsum.photos/200/300' alt={name} />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Sku: {sku}</p>
          <p>
            <select
              aria-label={`Select quantity for ${name} sku ${sku}`}
              onChange={(e) => dispatch({
                type:"updateCart",sku, 
                quantity:parseInt(e.target.value)})}
              value={quantity}
            >
              <option value="0">Remove</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
        </div>
      </li>
    );
  }

  if (loading) return <Spinner />;
  if (error) throw error;
  const numInCart = cart.reduce((total,item)=> total+item.quantity,0);
  return (
    <section id="cart">
      <h1>{numInCart===0 ? "Your Cart is Empty"
      : `${numInCart} item ${numInCart<1 ? "s":""} in your cart`
      }</h1>
      <ul>{cart.map(renderItem)}</ul>
      {cart.length>0 && (
      <button className="btn brn-primary" onClick={()=>navigate('/checkout')}>Checkout</button>) }
    </section>
  );
}
