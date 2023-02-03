import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../store/user/user.actions";
import { BUTTON_TYPES } from "../button/button.component";
import {
  FormPage,
  FormContainer,
  Input,
  UnderlinedLink,
  ErrorText,
  SignInButton,
} from "../sign-in/sign-in.style";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUp() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password, confirmPassword } = formFields;
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { loading, error } = user;
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.user?.token && !loading) {
      navigate("/products");
    }
  }, [user, dispatch]);

  function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      return setErrorText("Passwords do not match");
    }
    dispatch(signUpUser(formFields));
    if (!error && user?.user) {
      navigate("/");
    } else {
      setErrorText(error);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormFields((prevFormFields) => ({ ...prevFormFields, [name]: value }));
    if (user.error) {
      setTimeout(() => {
        setErrorText("");
      }, 1000);
    }
  }

  return (
    <FormPage>
      <FormContainer>
        <h2>Sign Up!</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            required
            onChange={handleChange}
          />
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
          <Input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            required
            onChange={handleChange}
          />
          {errorText && <ErrorText>{errorText}</ErrorText>}
          <SignInButton type="submit" buttonType={BUTTON_TYPES.base}>
            Sign Up
          </SignInButton>
          <p>
            Already a user?{" "}
            <UnderlinedLink to="/sign-in">Sign in!</UnderlinedLink>
          </p>
        </form>
      </FormContainer>
    </FormPage>
  );
}

export default SignUp;
