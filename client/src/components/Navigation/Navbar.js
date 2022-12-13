import React, { useState } from "react";
import Navlinks from "./Navlinks";
import Navlogo from "./Navlogo";
import { CSSTransition } from "react-transition-group";
import Backdrop from "../Modal/Backdrop";

import classes from "./Navbar.module.css";
import "./NavbarAnimation.css";

export const Navbar = () => {
  const [showNavSmall, setShowNavSmall] = useState(false);

  const toggleNavSmallHandler = () => setShowNavSmall((prev) => !prev);

  const closeNavSmallHandler = () => setShowNavSmall(false);

  return (
    <div className={classes["main-nav"]}>
      <Navlogo />

      <nav className={classes.navBig}>
        <Navlinks />
      </nav>

      {showNavSmall && <Backdrop onClick={closeNavSmallHandler} />}
      <nav className={classes.navSmall}>
        <CSSTransition
          in={showNavSmall}
          timeout={300}
          mountOnEnter
          unmountOnExit
          classNames="slide-in-left"
        >
          <Navlinks
            onCloseNavSmall={closeNavSmallHandler}
            showNavSmall={showNavSmall}
          />
        </CSSTransition>
      </nav>

      <div onClick={toggleNavSmallHandler} className={classes.burgerIcon}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Navbar;
