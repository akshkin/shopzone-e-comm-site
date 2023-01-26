import React, { useState, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { Context } from "../../context/context";
import { Icon } from "@iconify/react";
import { signOutUser } from "../../utils/firebase.utils";
import {
  HeaderContainer,
  NavLinks,
  NavLink,
  Form,
  Input,
} from "./header.style";
import { UserContext } from "../../context/user.context";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems, favorites, filteredProductsBySearch } =
    useContext(Context);
  const { currentUser } = useContext(UserContext);

  const cartIcon = cartItems.length > 0 ? "ri:handbag-fill" : "ri:handbag-line";
  const navigate = useNavigate();

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    filteredProductsBySearch(searchTerm);
    navigate(`/search/${searchTerm}`);
    setSearchTerm("");
  }

  return (
    <>
      <HeaderContainer>
        <Link to="/">
          <span>SHOPZONE</span>
        </Link>
        <NavLinks>
          {currentUser ? (
            <span style={{ cursor: "pointer" }} onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <NavLink to="/sign-in">SIGN IN</NavLink>
          )}
          <NavLink to="/favorites">
            {favorites.length > 0 && (
              <span className="num-of-items favorites">{favorites.length}</span>
            )}
            <span className="faves">FAVORITES</span>
          </NavLink>
          <NavLink to="/cart">
            {cartItems.length > 0 && (
              <span className="num-cart">{cartItems.length}</span>
            )}
            <Icon className="cart" icon={cartIcon} />
          </NavLink>
        </NavLinks>
        <Form onSubmit={handleSubmit}>
          <label>Search</label>
          <Input
            type="search"
            onChange={handleChange}
            placeholder="Search products"
          />
        </Form>
      </HeaderContainer>

      <Outlet />
    </>
  );
}

export default Header;
