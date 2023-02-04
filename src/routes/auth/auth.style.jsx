import styled from "styled-components";
import Button from "../../components/button/button.component";
import { Link } from "react-router-dom";

export const FormPage = styled.main`
  padding: 1em;
  min-height: 100vh;
  background-color: #c4c4c4;
  background-image: url("/images/auth-bg.jpg");
  background-position: center;
  background-size: cover;
  background-blend-mode: soft-light;
`;

export const FormContainer = styled.div`
  width: 90%;
  max-width: 500px;
  padding: 2em;
  border: 1px solid white;
  margin-top: 2em;
  margin: 2em auto;

  h2 {
    margin-top: 0;
  }
`;

export const UnderlinedLink = styled(Link)`
  border-bottom: 3px solid black;
  transition: color 0.3s;

  &:hover,
  &:focus {
    font-weight: 900;
    color: black;
  }
`;

export const Input = styled.input`
  border: 1px solid lightgray;
  display: block;
  height: 50px;
  margin: 1em auto;
  width: 100%;
  padding: 0.5em;
  font-family: inherit;
`;
export const ErrorText = styled.div`
  padding: 1em;
  background-color: pink;
  color: #252525;
`;
export const SignInButton = styled(Button)`
  display: block;
  margin-top: 1em;
  width: 100%;
  height: 50px;
`;
