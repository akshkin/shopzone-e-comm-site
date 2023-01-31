import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.header`
  max-width: 100%;
  box-shadow: 0px 2px 10px -5px rgba(21, 6, 5, 0.2);
  padding: 1em;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: space-between;
  align-items: baseline;

  & svg {
    margin-right: 0.2em;
  }
  img {
    width: 70px;
  }

  .logo {
    width: 80px;
    height: auto;
    margin-bottom: -2.5em;

    @media (min-width: 700px) {
      width: 100px;
      /* margin-bottom: -2.5em; */
    }
  }

  .faves {
    margin-right: 1em;
    position: relative;
  }
  .favorites,
  .num-cart {
    color: white;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    font-size: 0.75rem;
    margin-left: 1em;
    display: grid;
    place-content: center;
    padding: 0.8em;
  }
  .favorites {
    background-color: coral;
    position: absolute;
    margin-top: -1em;
    margin-left: 5em;
  }

  .cart {
    font-size: 1.5rem;
    position: relative;
  }
  .num-cart {
    background-color: #252525;
    margin-top: -0.7em;
    position: absolute;
  }

  button {
    border: none;
    font-size: 1.5rem;
  }
  @media (min-width: 600px) {
    button {
      display: none;
    }
  }
`;

export const NavLink = styled(Link)`
  margin-right: 1em;
`;

export const NavLinks = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  align-items: baseline;
  gap: 1em;
`;

export const Input = styled.input`
  border-radius: 5px;
  display: block;
  height: 40px;
  padding: 0.5em;
  font-family: inherit;
  margin-top: 0.5em;
  width: 175px;
  border: 1px solid lightcoral;
  font-size: inherit;

  &:focus {
    outline: 1px solid lightblue;
    border: none;
  }

  @media (min-width: 350px) {
    width: 250px;
  }
`;
