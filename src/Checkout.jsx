import React, { useState } from "react";
import { saveShippingAddress } from "./services/shippingService";
import { UseCart } from "./cartContext";


// Declaring outside component to avoid recreation on each render
const emptyAddress = {
    city: "",
    country: "",
};
const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED",
}


export default function Checkout( ) {
    const {dispatch} = UseCart();
    const [address, setAddress] = useState(emptyAddress);
    const [status, setStatus] = useState(STATUS.IDLE);
    const [saveError, setSaveError] = useState(null);
    const [touched, setTouched] = useState({});
    const errors = getErrors(address);
    const isValid = Object.keys(errors).length === 0;
    function handleChange(e) {
        setAddress((curaddress) => {
            return {
                ...curaddress,
                [e.target.id]: e.target.value,
            }
        })
    }

    function handleBlur(event) {
        // TODO
        setTouched((curr) => {
            return { ...curr, [event.target.id]: true }
        })
    }

    async function handleSubmit(event) {
        setStatus(STATUS.SUBMITTING);
        if (isValid) {
            try {
                await saveShippingAddress(address);
                dispatch({type:"emptyCart"});
                setStatus(STATUS.COMPLETED);
                console.log("here")
            }
            catch (e) {
                console.log("error",e)
                setSaveError(e);
            }
        }
        else {
            setStatus(STATUS.SUBMITTED)
        }

    }

    function getErrors(address) {
        const result = {};
        if (!address.city) result.city = 'City is required';
        if (!address.country) result.country = 'Country is required';
        return result;
    }

    if (saveError) throw saveError;
    if(status===STATUS.SUBMITTED){
        return <h1>Thanks for Shopping</h1>
    }
    return (
        <>
            <h1>Shipping Info</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="city">City</label>
                    <br />
                    <input
                        id="city"
                        type="text"
                        value={address.city}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <p role="alert">
                        {(touched.city || status === STATUS.SUBMITTED) && errors.city}
                    </p>
                </div>

                <div>
                    <label htmlFor="country">Country</label>
                    <br />
                    <select
                        id="country"
                        value={address.country}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    >
                        <option value="">Select Country</option>
                        <option value="China">China</option>
                        <option value="India">India</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="USA">USA</option>
                        <option value="Australia">Australia</option>
                    </select>
                    <p role="alert">
                        {(touched.country || status === STATUS.SUBMITTED) && errors.country}
                    </p>
                </div>

                <div>
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Save Shipping Info"
                    />
                </div>
            </form>
        </>
    );
}
