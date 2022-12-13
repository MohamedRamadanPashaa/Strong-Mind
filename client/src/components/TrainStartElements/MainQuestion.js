import React, { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import Question from "./Question";
import classes from "./MainQuestion.module.css";

import ACTION from "../../assets/tables/Action.json";
import OBJECT_ONE from "../../assets/tables/Object-1.json";
import OBJECT_TWO from "../../assets/tables/Object-2.json";

const arrayNumber = () => {
  let numArray = [];
  for (let i = 0; i < 100; i++) {
    const num = i < 10 ? `0${i}` : `${i}`;

    numArray.push(num);
  }
  return numArray;
};

const MainQuestion = ({ dispatch, title }) => {
  // set table type
  let questions;
  if (title === "Object One") {
    questions = OBJECT_ONE;
  } else if (title === "Object Two") {
    questions = OBJECT_TWO;
  } else if (title === "Action") {
    questions = ACTION;
  }

  const [question, setQuestion] = useState(Math.floor(Math.random() * 100));
  const [answers, setAnswers] = useState([]);
  const [numOfQ, setNumOfQ] = useState(0);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [rightClass, setRightClass] = useState(true);

  const genAnswersHandler = useCallback(() => {
    const rightAns = questions[question].right_answer;
    let twoDigit = arrayNumber();
    twoDigit.splice(rightAns, 1);

    const ranNum1Index = Math.floor(Math.random() * twoDigit.length);
    const num1 = twoDigit[ranNum1Index];
    twoDigit.splice(ranNum1Index, 1);

    const ranNum2Index = Math.floor(Math.random() * twoDigit.length);
    const num2 = twoDigit[ranNum2Index];
    twoDigit.splice(ranNum2Index, 1);

    const num = [rightAns, num1, num2];

    let ranArray = [];
    for (let i = 0; i < 3; i++) {
      const ranInd = Math.floor(Math.random() * num.length);
      ranArray.push(num[ranInd]);
      num.splice(ranInd, 1);
    }

    setAnswers(ranArray);
  }, [question, questions]);

  useEffect(() => {
    genAnswersHandler();
  }, [genAnswersHandler]);

  const checkAnswer = (e) => {
    const rightAns = questions[question].right_answer;

    if (e.target.innerHTML === rightAns) {
      setRightAnswers((prev) => (prev += 1));
      setRightClass(true);
    } else {
      setRightClass(false);
    }
    setQuestion(Math.floor(Math.random() * 100));
    setNumOfQ((prev) => (prev += 1));
  };

  return (
    <div className={classes.mainQ}>
      <Header
        dispatch={dispatch}
        numOfQ={numOfQ}
        rightAnswers={rightAnswers}
        title={title}
        rightClass={rightClass}
      />
      <Question
        checkAnswer={checkAnswer}
        questions={questions}
        question={question}
        dispatch={dispatch}
        answers={answers}
      />
    </div>
  );
};

export default MainQuestion;
