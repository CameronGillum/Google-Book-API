import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";

const SignupForm = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [createUser, { error }] = useMutation(CREATE_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Form state before submission:", formState); // Log form state
    try {
      const { data } = await createUser({
        variables: { ...formState },
      });

      // Handle successful signup (e.g., save token, redirect)
      console.log("Signup success:", data);
      // Example: Save token and redirect
      // Auth.login(data.createUser.token);
      // window.location.assign('/');
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        name="username"
        type="text"
        placeholder="Username"
        value={formState.username}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formState.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formState.password}
        onChange={handleChange}
      />
      <button type="submit">Signup</button>
      {error && <p>Error signing up: {error.message}</p>}
    </form>
  );
};

export default SignupForm;