import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import {useUser} from

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    e.preventDefault();
    try {
      const res = await axios.post("api/students/login", {
        email,
        password,
      });
      const token = res.data;
      console.log(res.data);
      console.log(token);
      const loggedInUser = await loginUser(token);
      console.log("logged in user:", loggedInUser);

      setEmail("");
      setPassword("");
      Navigate(`/student/${loggedInUser._id}`);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={onLogin}>
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
      <button type="submit">Login</button>
    </form>
  );
}
export default Login;
