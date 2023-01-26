import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase.utils";
import { BUTTON_TYPES } from "../button/button.component";
import {
  FormPage,
  FormContainer,
  Input,
  UnderlinedLink,
  ErrorText,
  SignInButton,
} from "./sign-in.style";

const defaultFormFields = {
  email: "",
  password: "",
};

function SignIn() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      if (user) {
        setTimeout(() => {
          navigate("/products");
        }, 500);
      }
      setFormFields(defaultFormFields);
    } catch (error) {
      setError(error);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormFields((prevFormFields) => ({ ...prevFormFields, [name]: value }));
    if (error) {
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  }

  return (
    <FormPage>
      <FormContainer>
        <h2>Sign in!</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="Email address"
            required
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            required
            onChange={handleChange}
          />
          {error && <ErrorText>{error.message}</ErrorText>}
          <SignInButton buttonType={BUTTON_TYPES.base}>Sign In</SignInButton>
          <p>
            Don't have an account?{" "}
            <UnderlinedLink to="/sign-up">Sign up!</UnderlinedLink>
          </p>
        </form>
      </FormContainer>
    </FormPage>
  );
}

export default SignIn;
