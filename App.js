import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./Component/Layout/Header";
import Back from "./Component/Assets/BACK.jpg";
import classes from "./App.module.css";
import SignUpForm from "./Component/Login/SignUpForm";
import SignInForm from "./Component/Login/SignInForm";
import Home from "./Component/Pages/Home";
import ProfileUpdateForm from "./Component/Pages/ProfileUpdateForm";
import Forgotpassword from "./Component/Pages/forgotPassword";
import Expense from "./Component/Components/Expense";
import About from "./Component/Pages/About";
import ContactUs from "./Component/Pages/ContactUs";

function App() {
  const AuthisLogin = useSelector((state) => state.auth.isLoggedIn);
  const AuthisPremium = useSelector((state) => state.theme.changeTheme);

  return (
    <div>
      <Header></Header>
      <Switch>
        <Route path={"/"} exact>
          <Redirect to={"/signup"} />
        </Route>
        <Route path={"/home"} exact>
          <Home></Home>
        </Route>
        <Route path={"/signup"}>
          <SignUpForm></SignUpForm>
        </Route>
        <Route path={"/signin"}>
          <SignInForm></SignInForm>
        </Route>
        <Route path={"/home/profile"}>
          <ProfileUpdateForm></ProfileUpdateForm>
        </Route>
        <Route path={"/forgotpassword"}>
          <Forgotpassword></Forgotpassword>
        </Route>
        <Route path={"/about"}>
          <About></About>
        </Route>
        <Route path={"/contactus"}>
          <ContactUs></ContactUs>
        </Route>
        {AuthisLogin && (
          <Route path={"/expenses"}>
            <Expense></Expense>
          </Route>
        )}
        {/* {AuthisLogin &&
          <Route path={'*'}>
            <Redirect to={'/signup'} />
          </Route>
        } */}
      </Switch>
      {!AuthisPremium && (
        <img className={classes.img} alt='back' src={Back}></img>
      )}
    </div>
  );
}

export default App;
