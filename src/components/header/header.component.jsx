import React, {useState, useContext} from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"

import {Context} from "../../context/context"
import { Icon } from '@iconify/react';
import { signOutUser } from "../../utils/firebase.utils";
//import Button, { BUTTON_TYPES } from "../button/button.component";
import { HeaderContainer, NavLinks, NavLink} from "./header.style"
import { UserContext } from "../../context/user.context";



function Header() {
    //const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const { cartItems, favorites, filteredProductsBySearch } = useContext(Context)
    const { currentUser } = useContext(UserContext)
    const navigate = useNavigate()
    const cartIcon = cartItems.length > 0 ? "ri:handbag-fill" : "ri:handbag-line"

    // function handleSubmit(event){
    //     event.preventDeafult()
    //     if(searchTerm){
    //         navigate(`/search/${searchTerm}`)
    //         //filteredProductsBySearch(searchTerm)
    //     }
    //     setSearchTerm("")
    // }
    
    return (
        <>
            <HeaderContainer>
                <Link to="/">                
                    <span>SHOPZONE</span>
                </Link>
                
                <NavLinks>                    
                    {currentUser ? <span style={{cursor: "pointer"}} onClick={signOutUser}>SIGN OUT</span> : <NavLink to="/sign-in">SIGN IN</NavLink>}
                    <NavLink to="/favorites">
                        {favorites.length > 0 && <span className="num-of-items favorites">{favorites.length}</span>}
                        <span className="faves">FAVORITES</span>
                    </NavLink>
                    <NavLink to="/cart">
                        {cartItems.length > 0 && <span className="num-cart">{cartItems.length}</span>}
                        <Icon className="cart" icon={cartIcon} />
                    </NavLink>
                </NavLinks>

            </HeaderContainer>
            {/* <form onSubmit={handleSubmit}>
                <input 
                    type="search"
                    placeholder="Search products"
                    onChange={(e) => setSearchTerm(e.target.value) }
                />
                <button>Search</button>
            </form> */}
            <Outlet />
        </>
    )
}

export default Header
