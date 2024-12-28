import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [enterEmail, setEnterEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enterPassword, setEnterPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  
    const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(enterEmail, enterPassword);
    props.onLogin(enterEmail, enterPassword);     
    navigate("/EmptyState");
    setEnterEmail("");
    setEnterPassword("");
  };

  const emailChangeHandler = (event) => {
    setEnterEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes("@") && enterPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    setEnterPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 &&  enterEmail.includes("@")
    );
  };

  const validEmailHandler = () => {
    setEmailIsValid(enterEmail.includes("@"));
    };

  const validPasswordHandler = () => {
    setPasswordIsValid(enterPassword.trim().length > 6);
  };

  return (
    <div className="main-div">
      <div className="login-div">
        <h1>Sign in</h1>

        <form onSubmit={submitHandler}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className={` email ${emailIsValid === false ? "invalid" : ""}`}
            value={enterEmail}
            onChange={emailChangeHandler}
            onBlur={validEmailHandler}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password should be more than 6 numbers"
            className={` password ${
              passwordIsValid === false ? "invalid" : ""
            }`}
            value={enterPassword}
            onChange={passwordChangeHandler}
            onBlur={validPasswordHandler}
            required
          />

          <div className="checkbox-div">
            <input type="checkbox" className="checkbox" id="remember_me" />
            <label htmlFor="remember_me" className="remember-me">
              Remember me
            </label>
          </div>

          <button type="submit" className="login" disabled={!formIsValid}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
