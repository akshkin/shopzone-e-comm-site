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
    
    console.log("header")
    return (
        <HeaderContainer>
            <Link to="/">                
                <span>SHOPZONE</span>
            </Link>
            {/* <Button buttonType={BUTTON_TYPES.inverted} aria-label="open navigation">&#9776;</Button> */}
            <NavLinks>
                {/* <Link to="/mens">MEN</Link>
                <Link to="/womens">WOMEN</Link>
                <Link to="/jewelery">JEWELERY</Link>
                <Link to="/electronics">ELECTRONICS</Link> */}
                
                <Link to="/favorites">
                    {favorites.length > 0 && <span className="num-of-items favorites">{favorites.length}</span>}
                    <span className="faves">FAVORITES</span>
                </Link>
                <Link to="/cart">
                    {cartItems.length > 0 && <span className="num-cart">{cartItems.length}</span>}
                    <Icon className="cart" icon={cartIcon} />
                </Link>
            </NavLinks>

            {/* {isOpen && <NavLinksOpen>
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
            </NavLinksOpen>} */}
        </HeaderContainer>
    )
}

export default Header
