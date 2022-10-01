import { useState } from "react"
import { Link } from "react-router-dom"
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase.utils"
import Button, {BUTTON_TYPES} from "../button/button.component"
import { FormContainer, Input, ErrorText, SignInButton} from "./sign-in.style"

const defaultFormFields = {
  email: "",
  password: ""
}

function SignIn(){
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {email, password} = formFields
  const [error, setError] = useState("")

  async function handleSubmit(event){
    event.preventDefault()

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password)
      console.log(user)
      setFormFields(defaultFormFields)
    } catch (error){
      setError(error)
    }
  }

  function handleChange(event){
    const {name, value} = event.target
    setFormFields({...formFields, [name]:value})
  }

  return (
    <FormContainer>
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
        <p>Don't have an account? <Link to="/sign-up">Sign up!</Link></p>
      </form>
    </FormContainer>
  )
}

export default SignIn