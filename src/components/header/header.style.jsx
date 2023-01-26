import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.header`
  height: 70px;
  max-width: 100%;
  box-shadow: 0px 2px 10px -5px rgba(21, 6, 5, 0.2);
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & svg {
    margin-right: 0.2em;
  }
  img {
    width: 70px;
  }

  .faves {
    margin-right: 1em;
  }
  .favorites,
  .num-cart {
    color: white;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    font-size: 0.75rem;
    padding: 0.3em 0.6em;
  }
  .favorites {
    background-color: red;
  }

  .num-cart {
    background-color: #252525;
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
export const NavLinks = styled.nav`
  display: flex;
  justify-content: space-evenly;

  Link {
    margin-left: 1em;
  }
`;

export const NavLink = styled(Link)`
  margin-left: 1em;
`;
