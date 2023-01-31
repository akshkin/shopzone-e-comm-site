import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user.context";
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
  const { setCurrentUser, signIn } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = await signIn(formFields);
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
          {error && <ErrorText>{error}</ErrorText>}
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
