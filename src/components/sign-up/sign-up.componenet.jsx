import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user.context";
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
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setCurrentUser, signUp } = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    const data = await signUp(formFields);
    if (!data.error) {
      setCurrentUser(data);
      navigate("/products");
    } else setError(data.error.message);
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
          {error && <ErrorText>{error}</ErrorText>}
          <SignInButton buttonType={BUTTON_TYPES.base}>Sign Up</SignInButton>
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
