import React, { useState } from "react";

function Quiz({ questions, score, setScore, endQuiz }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === questions[current].answer) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
        setSelected("");
      } else {
        endQuiz();
      }
    }, 500);
  };

  return (
    <div className="quiz flex flex-col items-center justify-center mt-10 text-white">
      <h2 className="font-display text-3xl mb-10">
        Question {current + 1}/{questions.length}
      </h2>
      <p className="text-5xl m-10 text-black font-mono text-white text-center">{questions[current].question}</p>
      <div className="options grid grid-cols-2 gap-y-15 gap-x-50 justify-center items-center mt-20">
        {questions[current].options.map((option, i) => (
          <button   
            key={i}
            onClick={() => handleAnswer(option)}
            className={selected === option ? "bg-orange-500 pt-5 pb-5 pl-20 pr-20 font-mono text-3xl text-white rounded-xl border-black border-3" : "bg-blue-900 pt-5 pb-5 pl-20 pr-20 font-mono text-3xl text-white rounded-xl border-black border-3 hover:border-white"}
          >
            {option}
          </button>
        ))}
      </div>
      <h2 className="mt-20 text-2xl font-mono">Score: {score}</h2>
    </div>
  );
}

export default Quiz;
