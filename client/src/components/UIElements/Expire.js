import React, { useEffect, useState } from "react";

import classes from "./Expire.module.css";

const Expire = ({ delay, children, onCancel }) => {
  const [visable, setVisable] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisable(false);
      onCancel();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, onCancel]);

  return visable && <div className={classes.msg}>{children}</div>;
};

export default Expire;
