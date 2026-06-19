import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = () => {
    fetch("http://localhost:3000/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );

          setMessage("Login success");
        } else {
          setMessage(data.message);
        }
      });
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={login}>
        Login
      </button>

      <p>
        {message}
      </p>
    </div>
  );
}

export default Login;