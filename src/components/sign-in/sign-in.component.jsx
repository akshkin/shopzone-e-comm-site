import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../../store/user/user.actions";
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
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, error } = user;

  useEffect(() => {
    if (user?.user?.token && !loading) {
      navigate("/products");
    }
  }, [user, dispatch]);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(signInUser(formFields));

    if (error) {
      setErrorText(user.error);
      setTimeout(() => {
        setErrorText("");
      }, 2000);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormFields((prevFormFields) => ({ ...prevFormFields, [name]: value }));
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
          {errorText && <ErrorText>{errorText}</ErrorText>}
          <SignInButton type="submit" buttonType={BUTTON_TYPES.base}>
            Sign In
          </SignInButton>
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
