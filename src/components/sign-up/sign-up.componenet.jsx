import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils";
import { BUTTON_TYPES } from "../button/button.component";
import {
  FormContainer,
  Input,
  ErrorText,
  SignInButton,
} from "../sign-in/sign-in.style";

const defaultFormFields = {
  firstName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUp() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { firstName, email, password, confirmPassword } = formFields;
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    }
    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(response, {
        displayName: firstName,
        email,
      });
      if (response) {
        setTimeout(() => {
          navigate("/products");
        }, 500);
      }
      setFormFields(defaultFormFields);
    } catch (error) {
      setError("Something went wrong! Please try again.");
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
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="firstName"
          value={firstName}
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
        {error && <ErrorText>{error.message}</ErrorText>}
        <SignInButton buttonType={BUTTON_TYPES.base}>Sign Up</SignInButton>
        <p>
          Already a user? <Link to="/sign-in">Sign in!</Link>
        </p>
      </form>
    </FormContainer>
  );
}

export default SignUp;
