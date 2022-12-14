import { NavLink, useHistory } from "react-router-dom";
import { useSelector, Provider, useDispatch } from "react-redux";
import { authActions } from "../Store/Auth";
import { themeActions } from "../Store/Theme";
import store from "../Store";

import classes from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const authisLogin = useSelector((state) => state.auth.isLoggedIn);
  const AuthisPremium = useSelector((state) => state.theme.isPremium);
  const changeTheme = useSelector((state) => state.theme.changeTheme);
  console.log(authisLogin);
  const history = useHistory();
  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
    history.replace("/signin");
  };
  const themeHandler = () => {
    dispatch(themeActions.switch());
  };
  return (
    <Provider store={store}>
      <div className={changeTheme ? classes.header1 : classes.header}>
        <span className={classes.span1}>
          <h1>MyWebLink</h1>
        </span>
        <span className={changeTheme ? classes.spana2 : classes.span2}>
          <h4>
            {" "}
            <NavLink
              className={changeTheme ? classes.link : classes.link1}
              to={"/home"}
            >
              HOME
            </NavLink>
          </h4>
          {authisLogin && (
            <h4>
              <NavLink
                className={changeTheme ? classes.link : classes.link1}
                to={"/expenses"}
              >
                Expenses
              </NavLink>
            </h4>
          )}
          <h4>
            {" "}
            <NavLink
              className={changeTheme ? classes.link : classes.link1}
              to={"/about"}
            >
              About
            </NavLink>
          </h4>
          <h4>
            <NavLink
              className={changeTheme ? classes.link : classes.link1}
              to={"/contactus"}
            >
              Contact Us
            </NavLink>
          </h4>
        </span>
        <span className={classes.actions}>
          {AuthisPremium && <button onClick={themeHandler}>Theme</button>}
          {authisLogin && <button onClick={logoutHandler}>Log Out</button>}
        </span>
      </div>
    </Provider>
  );
};

export default Header;
