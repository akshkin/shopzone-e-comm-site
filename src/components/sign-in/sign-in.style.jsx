import styled from "styled-components";
import Button from "../button/button.component";

export const FormContainer = styled.div`
  width: 90%;
  max-width: 500px;
  padding: 2em;
  border: 1px solid lightgray;
  margin-top: 2em;
  margin: 2em auto;
`;

export const Input = styled.input`
  border: 1px solid lightgray;
  display: block;
  height: 50px;
  margin: 1em auto;
  width: 100%;
  padding: 0.5em;
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
