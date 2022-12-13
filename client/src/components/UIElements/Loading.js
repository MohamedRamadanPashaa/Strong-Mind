import classes from "./Loading.module.css";

const Loading = ({ center }) => {
  return (
    <div className={center && "center"}>
      <div className={classes["lds-hourglass"]}></div>
    </div>
  );
};

export default Loading;
