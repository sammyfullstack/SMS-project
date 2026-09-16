import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSignUp = (e) => {
    e.preventDefault();
    try {
      axios.post("api/students", {
        name,
        email,
        password,
      });
      setName("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  if (error) return <h1>{error}</h1>;
  return (
    <form onSubmit={onSignUp}>
      <input
        placeholder="Enter your name"
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Enter your Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">SignUp</button>
    </form>
  );
}

export default SignUp;
