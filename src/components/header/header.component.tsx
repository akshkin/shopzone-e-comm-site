import React, { useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  HeaderContainer,
  NavLinks,
  StyledNavLink,
  Form,
  Input,
} from "./header.style";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { errorMessage, getUser, signOutUser } from "../../features/userSlice";
import { selectFavorites } from "../../features/favoritesSlice";
import { selectCartItems } from "../../features/cartSlice";
import { getProductsBySearch } from "../../utils/utils";

const Logo = require("../../images/logo.png");

type LinkParam = {
  isActive: boolean;
};

function Header() {
  const [searchTerm, setSearchTerm] = useState("");

  const cartItems = useAppSelector(selectCartItems);
  const favorites = useAppSelector(selectFavorites);
  const error = useAppSelector(errorMessage);

  const user = useAppSelector(getUser);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartIcon = cartItems.length > 0 ? "ri:handbag-fill" : "ri:handbag-line";

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (searchTerm) {
      getProductsBySearch(searchTerm);
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  }

  function signOut() {
    dispatch(signOutUser());
    if (error) return;
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  }

  return (
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
          <StyledNavLink
            className={({ isActive }: LinkParam) => (isActive ? "active" : "")}
            to="/auth"
          >
            SIGN IN
          </StyledNavLink>
        )}
        <StyledNavLink
          className={({ isActive }: LinkParam) => (isActive ? "active" : "")}
          to="/favorites"
        >
          {favorites && favorites?.length > 0 && (
            <span className="num-of-items favorites">{favorites.length}</span>
          )}
          <span className="faves">FAVORITES</span>
        </StyledNavLink>
        <StyledNavLink
          className={({ isActive }: LinkParam) => (isActive ? "active" : "")}
          to="/cart"
        >
          {cartItems?.length > 0 && (
            <span className="num-cart">{cartItems.length}</span>
          )}
          <Icon className="cart" icon={cartIcon} />
        </StyledNavLink>
      </NavLinks>
      <Form onSubmit={handleSubmit}>
        {/* <label>Search</label> */}
        <Input
          type="search"
          onChange={handleChange}
          placeholder="Search products"
          value={searchTerm}
        />
      </Form>
    </HeaderContainer>
  );
}

export default Header;
