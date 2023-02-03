import React, { useState, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../images/logo.png";
import { Icon } from "@iconify/react";
import {
  HeaderContainer,
  NavLinks,
  NavLink,
  Form,
  Input,
} from "./header.style";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../store/user/user.actions";

function Header({ filteredProductsBySearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems } = useSelector((state) => state.cartItems);
  const { favorites } = useSelector((state) => state.favorites);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartIcon = cartItems.length > 0 ? "ri:handbag-fill" : "ri:handbag-line";

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (searchTerm) {
      filteredProductsBySearch(searchTerm);
      navigate(`/search/${searchTerm}`);
    }
    setSearchTerm("");
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
