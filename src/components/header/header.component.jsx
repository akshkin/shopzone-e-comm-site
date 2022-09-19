import React, {useState, useContext} from "react"
import { Link, } from "react-router-dom"

import {Context} from "../../context/context"
import { Icon } from '@iconify/react';
import Button, { BUTTON_TYPES } from "../button/button.component";
import { HeaderContainer, NavLinks, NavLinksOpen} from "./header.style"



function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const { cartItems, favorites} = useContext(Context)
    
    const cartIcon= cartItems.length > 0 ? "ri:handbag-fill" : "ri:handbag-line"
    
    console.log(window.innerWidth)

    function handleNav(){
       setIsOpen(!isOpen)
    }

    return (
        <HeaderContainer>
            <Link to="/">                
                {/* <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.13em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 227"><path fill="#1B191B" d="m243.563 83.255l-70.728-70.727a42.537 42.537 0 0 0-60.295 0L81.066 44.153a70.033 70.033 0 0 1 0 138.319l31.625 31.655a42.543 42.543 0 0 0 46.47 9.271a42.543 42.543 0 0 0 13.825-9.271l70.577-70.757a42.54 42.54 0 0 0 0-60.115ZM80.1 45.117l.965-.964a70.033 70.033 0 1 0 0 138.318l-.965-.964a96.474 96.474 0 0 1 0-136.39Z"/></svg> */}
                <span>SHOPZONE</span>
            </Link>
            <Button buttonType={BUTTON_TYPES.inverted} onClick={setIsOpen(true)} aria-label="open navigation">&#9776;</Button>
            <NavLinks>
                <Link to="/mens">MEN</Link>
                <Link to="/womens">WOMEN</Link>
                <Link to="/jewelery">JEWELERY</Link>
                <Link to="/electronics">ELECTRONICS</Link>
                
                <Link to="/favorites">
                    {favorites.length > 0 && <span className="num-of-items favorites">{favorites.length}</span>}
                    <span className="faves">FAVORITES</span>
                </Link>
                <Link to="/cart">
                    {cartItems.length > 0 && <span className="num-cart">{cartItems.length}</span>}
                    <Icon className="cart" icon={cartIcon} />
                </Link>
            </NavLinks>

            {isOpen && <NavLinksOpen>
                <Button buttonType={BUTTON_TYPES.inverted} onClick={setIsOpen(false)} aria-label="close navigation">&times;</Button>
                <Link to="/mens">MEN</Link>
                <Link to="/womens">WOMEN</Link>
                <Link to="/jewelery">JEWELERY</Link>
                <Link to="/electronics">ELECTRONICS</Link>
                
                <Link to="/favorites">
                    {favorites.length > 0 && <span className="num-of-items favorites">{favorites.length}</span>}
                    <span className="faves">FAVORITES</span>
                </Link>
                <Link to="/cart">
                    {cartItems.length > 0 && <span className="num-cart">{cartItems.length}</span>}
                    <Icon className="cart" icon={cartIcon} />
                </Link>
            </NavLinksOpen>}
        </HeaderContainer>
    )
}

export default Header
