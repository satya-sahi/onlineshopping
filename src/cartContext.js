import React, { useReducer, useEffect, useContext } from "react";
import cartReducer from './cartReducer';



const CartContext = React.createContext(null);
let initialCart;
try {
    initialCart = JSON.parse(localStorage.getItem("cart")) ?? []
}
catch (e) {
    console.error("Json cannot be parsed");
    initialCart = []
}

export function CartProvider(props) {
    const [cart, dispatch] = useReducer(cartReducer, initialCart)
    useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart])
    const contextValue = {
        cart,
        dispatch
    };
    return <CartContext.Provider value={contextValue}>
        {props.children}
    </CartContext.Provider>
}

export function UseCart(){
    const context =  useContext(CartContext);
    if(!context){
        throw new Error("UseContext must be used within a CartProvider.Wrap a parent Component in cart provider to fix this error")
    }
    return context;
}