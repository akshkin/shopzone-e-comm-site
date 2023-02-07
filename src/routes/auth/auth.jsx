import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInUser, signUpUser } from "../../store/user/user.actions";
import { BUTTON_TYPES } from "../../components/button/button.component";
import {
  FormPage,
  FormContainer,
  Input,
  UnderlinedLink,
  ErrorText,
  SignInButton,
} from "./auth.style";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [errorText, setErrorText] = useState("");

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password, confirmPassword } = formFields;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.error);

  useEffect(() => {
    if (user && !loading) {
      navigate("/products");
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (message) {
      setErrorText(message.message);
    }
  }, [message]);

  function handleSubmit(event) {
    event.preventDefault();

    if (isLoggingIn) {
      dispatch(signInUser(formFields));
    } else {
      if (password !== confirmPassword) {
        return setErrorText("Passwords do not match");
      } else {
        dispatch(signUpUser(formFields));
      }
    }
    if (!message) {
      setFormFields(defaultFormFields);
    }
  }

  function toggleLoggingIn() {
    setIsLoggingIn((prevLoggingIn) => !prevLoggingIn);
    setFormFields(defaultFormFields);
    setErrorText("");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormFields((prevFormFields) => ({ ...prevFormFields, [name]: value }));
  }

  return (
    <FormPage>
      <FormContainer>
        <h2>{isLoggingIn ? "Sign in!" : "Sign Up!"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLoggingIn && (
            <Input
              type="text"
              name="name"
              value={name}
              placeholder="Name"
              required
              onChange={handleChange}
            />
          )}
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
            minLength={7}
            onChange={handleChange}
          />
          {!isLoggingIn && (
            <Input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              required
              onChange={handleChange}
            />
          )}

          {errorText && <ErrorText>{errorText}</ErrorText>}

          <SignInButton type="submit" buttonType={BUTTON_TYPES.base}>
            {isLoggingIn ? " Sign In" : "Sign Up"}
          </SignInButton>
          <p>
            {isLoggingIn ? "Don't have an account?" : "Already a user?"}

            <UnderlinedLink onClick={toggleLoggingIn}>
              {isLoggingIn ? "Sign up!" : "SignIn"}
            </UnderlinedLink>
          </p>
        </form>
      </FormContainer>
    </FormPage>
  );
}

export default Auth;
