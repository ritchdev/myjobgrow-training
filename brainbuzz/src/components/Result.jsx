import React from "react";

function Result({ score, restartQuiz }) {
  return (
    <div className="result-screen p-10 flex flex-col items-center justify-top gap-8">
      <h1 className="font-display text-6xl text-sky-400 text-shadow-(--my-text-shadow)">
        Quiz Complete!
      </h1>

      <h3 className="font-display text-2xl text-green-500">
        Your Score: <span className="text-white">{score}</span>
      </h3>

      <div className="mt-28 flex flex-col items-center gap-3 font-roboto text-lg font-light text-gray-200 mt-5">
        {score == 20 && <p>You’re a true BrainBuzz Champion!!</p>}
        {score >= 15 && <p>Awesome work! You’re getting there!</p>}
        {score < 10 && <p>Nice try! Give it another go and aim higher</p>}
      </div>

      <button
        onClick={restartQuiz}
        className="mt-26 font-display text-3xl text-white bg-green-600 pt-2 pl-8 pb-2 pr-8 rounded-md hover:bg-green-700 transition"
      >
        Play Again
      </button>

      <div className="font-roboto mt-20 text-sm text-gray-400 flex flex-row items-center gap-2">
        <h4>Powered by</h4>
        <img src="src/assets/react.svg" className="w-6 h-6" />
      </div>
    </div>
  );
}

export default Result;
