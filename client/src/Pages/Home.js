import { useSelector } from "react-redux";
import Button from "../components/FormElement/Button";
import classes from "./Home.module.css";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className={classes.welcome}>
      <div className={classes.overlay}></div>
      <div className={classes.content}>
        <h1>Welcome To Strong Mind!</h1>
        <p>Keep your mind active and strong.</p>
        {user ? (
          <div className={classes.btns}>
            <Button className={classes.button} to="train">
              Train
            </Button>
            <Button className={classes.button} to="object-one-ranking">
              Ranking
            </Button>
          </div>
        ) : (
          <div className={classes.btns}>
            <Button className={classes.button} to="login">
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
