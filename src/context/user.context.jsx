import { useState, useContext, createContext } from "react";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  const baseURL = "https://shopzone-server.onrender.com";

  async function signIn(formFields) {
    try {
      const response = await fetch(`${baseURL}/users/signin`, {
        ...options,
        body: JSON.stringify(formFields),
      });
      const data = await response.json();
      // if (response.status.code !== 200) {
      //   return;
      // }
      // setCurrentUser(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  async function signUp(formFields) {
    try {
      const response = await fetch(`${baseURL}/users/signup`, {
        ...options,
        body: JSON.stringify(formFields),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  async function signOut() {
    try {
      const response = await fetch(
        "https://shopzone-server.onrender.com/users/signout",
        {
          ...options,
          headers: {
            Authorization: currentUser.token,
          },
        }
      );
      const data = await response.json();
      if (!data.token) {
        setCurrentUser(null);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  const value = { currentUser, setCurrentUser, signIn, signUp, signOut };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
