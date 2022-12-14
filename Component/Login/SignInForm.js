import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import classes from "./SignInForm.module.css";
import { authActions } from "../Store/Auth";

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const EmailRef = useRef("");
  const PasswordRef = useRef("");
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = EmailRef.current.value;
    const enteredPassword = PasswordRef.current.value;
    setIsLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLwFZKg8KZEIlRPJ_FBc37TP7Vk45D3AE",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          res.json().then((data) => {
            console.log("User signed in");
            console.log(data);
            const loginEmail = data.email.replace(/[^a-zA-Z ]/g, "");
            dispatch(
              authActions.login({ token: data.idToken, email: loginEmail })
            );
            // Authctx.logIn(data.idToken, loginEmail)
            history.replace("/home");
          });
        } else {
          res.json().then((data) => {
            console.log(data);
            let errorMessage = "authentication failed...";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    EmailRef.current.value = "";
    PasswordRef.current.value = "";
  };

  return (
    <section className={classes.auth}>
      <h1>{"login"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label>Email</label>
          <input type='email' id='loginemail' ref={EmailRef} required />
        </div>
        <div className={classes.control}>
          <label>Password</label>
          <input
            type='password'
            id='loginpassword'
            ref={PasswordRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {isLoading && <lable>Sending Request...</lable>}
          {<button>{"login"}</button>}
        </div>
        <div className={classes.actions}>
          <Link to={"forgotpassword"}>forgot password ?</Link>
        </div>
        <div className={classes.actions1}>
          <Link to={"/signup"}>Dont have a account? signup</Link>
        </div>
      </form>
    </section>
  );
};

export default SignInForm;
