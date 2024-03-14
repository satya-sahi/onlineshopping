import React from "react";
import { Link, NavLink } from "react-router-dom";
import './App.css';


function Header (){
const activeStyle ={
  color :'purple',
};
return (
<header>
          <nav>
            <ul>
              <li>
                <Link to="/">
                  <h1>Welcome to Amazon Online Shopping</h1>
                  <img src='https://picsum.photos/200/300'  alt="logo" />
                </Link>
              </li>
              <li>
                <NavLink activeStyle={activeStyle} to="/products">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink activeStyle={activeStyle} to="/cart">
                  Cart
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
    
)
}


export default Header;