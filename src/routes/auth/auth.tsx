import { useEffect, useState, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BUTTON_TYPES } from "../../components/button/button.component";
import {
  FormPage,
  FormContainer,
  Input,
  UnderlinedLink,
  ErrorText,
  SignInButton,
} from "./auth.style";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import {
  getUser,
  userLoading,
  errorMessage,
  signInUser,
  signUpUser,
} from "../../features/userSlice";
import { StyledLoader } from "../products/products.style";
import { Link } from "react-router-dom";

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
  const dispatch = useAppDispatch();

  const user = useAppSelector(getUser);
  const loading = useAppSelector(userLoading);
  const error = useAppSelector(errorMessage);
  const location = useLocation();
  const from = location.state?.path || "/products";

  useEffect(() => {
    if (user && !loading) {
      navigate(from);
    }
  }, [user, loading, dispatch, navigate, from]);

  useEffect(() => {
    if (error) {
      setErrorText(error);
    }
  }, [error]);

  function handleSubmit(event: React.FormEvent) {
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
    if (!error) {
      setFormFields(defaultFormFields);
    }
  }

  function toggleLoggingIn() {
    setIsLoggingIn((prevLoggingIn) => !prevLoggingIn);
    setFormFields(defaultFormFields);
    setErrorText("");
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormFields((prevFormFields) => ({ ...prevFormFields, [name]: value }));
  }

  return (
    <FormPage>
      {/* <ErrorText>
        We are currently facing technical issues with authentication. We will be
        back soon. You can still continue to browse products{" "}
        <Link to="/products" style={{ textDecoration: "underline" }}>
          here
        </Link>
      </ErrorText> */}
      {location?.state?.message && (
        <ErrorText>{location?.state?.message}</ErrorText>
      )}
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

          <SignInButton
            disabled={loading}
            type="submit"
            buttonType={BUTTON_TYPES.base}
          >
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
      {loading && <StyledLoader />}
    </FormPage>
  );
}

export default Auth;
