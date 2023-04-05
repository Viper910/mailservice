import { useRef, useState } from "react";
import { FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { login, signin } from "../../service";
import "./Signup.css";

export default function Signup() {
  const container = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pnumber, setPhonenumber] = useState("");

  const iconStyle = {
    textAlign: "center",
    lineHeight: "55px",
    color: "#acacac",
    transition: "0.5s",
    fontSize: "1.1rem",
    margin: "auto",
  };

  const navigate = useNavigate();

  const logoutHandler = () => {
    // this.setState({ isAuth: false, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };
  const signinFormHandler = (e) => {
    e.preventDefault();
    login(email, password)
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userId", result.data.userId);
        localStorage.setItem("userName", result.data.username);
        localStorage.setItem("userMailId", result.data.email);

        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        setAutoLogout(remainingMilliseconds);
        navigate("/inbox");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signupFormHandler = (e) => {
    e.preventDefault();
    console.log(username, email, pnumber, password);
    signin(username, email, pnumber, password)
      .then((result) => {
        console.log(result);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userId", result.data.user._id);
        localStorage.setItem("userName", result.data.username);
        localStorage.setItem("userMailId", result.data.user.email);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        setAutoLogout(remainingMilliseconds);
        navigate("/inbox");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signupHandler = () => {
    container.current.classList.add("sign-up-mode");
  };

  const signinHandler = () => {
    container.current.classList.remove("sign-up-mode");
  };

  return (
    <div class="containers" ref={container}>
      <div class="forms-containers">
        <div class="signin-signup">
          <form action="#" class="sign-in-form" onSubmit={signinFormHandler}>
            <h2 class="title">Sign in</h2>
            <div class="input-field">
              <FaUser style={iconStyle} />
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="input-field">
              <FaLock style={iconStyle} />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Login" class="authbtn solid" />
          </form>
          <form action="#" class="sign-up-form" onSubmit={signupFormHandler}>
            <h2 class="title">Sign up</h2>
            <div class="input-field">
              <FaUser style={iconStyle} />
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div class="input-field">
              <FaPhone style={iconStyle} />
              <input
                type="number"
                placeholder="Phonenumber"
                class="number-input"
                onChange={(e) => setPhonenumber(e.target.value)}
              />
            </div>
            <div class="input-field">
              <FaEnvelope style={iconStyle} />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="input-field">
              <FaLock style={iconStyle} />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type="submit" class="authbtn" value="Sign up" />
          </form>
        </div>
      </div>

      <div class="panels-containers">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>Secure, smart, and easy to use email</p>
            <button
              class="authbtn transparent"
              id="sign-up-authbtn"
              onClick={signupHandler}
            >
              Sign up
            </button>
          </div>
          <img src="img/log.svg" class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>One of us ?</h3>
            <p>Secure, smart, and easy to use email</p>
            <button
              class="authbtn transparent"
              id="sign-in-authbtn"
              onClick={signinHandler}
            >
              Sign in
            </button>
          </div>
          <img src="img/register.svg" class="image" alt="" />
        </div>
      </div>
    </div>
  );
}
