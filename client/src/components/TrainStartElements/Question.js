import classes from "./Question.module.css";

const Question = ({ question, questions, checkAnswer, answers }) => {
  return (
    <div className={classes.question}>
      <h3>{questions[question].word}</h3>
      <ul>
        {answers.map((answer) => (
          <li onClick={checkAnswer} key={answer}>
            {answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
