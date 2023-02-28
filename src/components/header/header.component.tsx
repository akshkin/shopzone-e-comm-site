import React, { useState, ChangeEvent } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  HeaderContainer,
  NavLinks,
  NavLink,
  Form,
  Input,
} from "./header.style";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { getUser, signOutUser, errorMessage } from "../../features/userSlice";
import { selectFavorites } from "../../features/favoritesSlice";
import { selectCartItems } from "../../features/cartSlice";
import { ErrorText } from "../../routes/auth/auth.style";
import { searchProducts } from "../../features/productsSlice";

const Logo = require("../../images/logo.png")



function Header() {
  const [searchTerm, setSearchTerm] = useState("");

  const cartItems = useAppSelector(selectCartItems);
  const favorites = useAppSelector(selectFavorites);

  const user = useAppSelector(getUser)
  const error = useAppSelector(errorMessage)

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartIcon = cartItems.length > 0 ? "ri:handbag-fill" : "ri:handbag-line";

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (searchTerm) {
      dispatch(searchProducts(searchTerm))
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  }

  function signOut() {
    dispatch(signOutUser());
    navigate("/");
  }

  return (
    <>
      <HeaderContainer>
        <Link to="/">
          <img src={Logo} alt="logo" className="logo" />
        </Link>
        <NavLinks>
          {user ? (
            <span
              style={{ cursor: "pointer", paddingRight: "1em" }}
              onClick={signOut}
            >
              SIGN OUT
            </span>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <NavLink to="/favorites">
            {favorites && favorites?.length > 0 && (
              <span className="num-of-items favorites">{favorites.length}</span>
            )}
            <span className="faves">FAVORITES</span>
          </NavLink>
          <NavLink to="/cart">
            {cartItems?.length > 0 && (
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
