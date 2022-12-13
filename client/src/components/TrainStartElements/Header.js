import classes from "./Header.module.css";
import Timer from "./Timer";

const Header = ({ rightAnswers, numOfQ, dispatch, title, rightClass }) => {
  return (
    <div className={classes.testHead}>
      <div>
        Score:{" "}
        <span className={rightClass ? classes.rightClass : classes.falseClass}>
          {rightAnswers}
        </span>
        <span className={classes.totalQ}>/{numOfQ}</span>
      </div>
      <Timer
        numOfQ={numOfQ}
        dispatch={dispatch}
        rightAnswers={rightAnswers}
        title={title}
      />
    </div>
  );
};

export default Header;
