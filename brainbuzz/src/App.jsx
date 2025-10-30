import React, { useState } from "react";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import StartScreen from "./components/StartScreen";
import questions from "./assets/questions";

function App() {
  const [currentStep, setCurrentStep] = useState("start"); // 'start', 'quiz', or 'result'
  const [score, setScore] = useState(0);

  const startQuiz = () => setCurrentStep("quiz");
  const endQuiz = () => setCurrentStep("result");
  const restartQuiz = () => {
    setScore(0);
    setCurrentStep("start");
  };

  return (
    <div className="app h-screen flex flex-col items-center justify-top bg-neutral-800">
      {currentStep === "start" && <StartScreen startQuiz={startQuiz} />}
      {currentStep === "quiz" && (
        <Quiz questions={questions} score={score} setScore={setScore} endQuiz={endQuiz} />
      )}
      {currentStep === "result" && <Result score={score} restartQuiz={restartQuiz} />}
    </div>
  );
}

export default App;
