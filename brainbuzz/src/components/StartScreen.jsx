import React from "react";

function StartScreen({ startQuiz }) {
    return (
        <div className="start-screen p-10 flex flex-col items-center justify-top gap-5">
            <h1 className="font-display text-7xl text-sky-400 text-shadow-(--my-text-shadow)">BrainBuzz</h1>
            <h3 className="font-display text-xl text-green-500">Where Learning Meets Fun!</h3>
            <div className="font-roboto mt-40 font-light text-lg flex flex-row items-center gap-2 scale-150">
                <h4 className="text-white">Made with </h4>
                <img className="[animation:spin_3s_linear_infinite]" src="src/assets/react.svg"></img>
            </div>
            <button className="mt-50 font-display text-4xl text-white bg-green-600 pt-2 pl-7 pb-2 pr-7 rounded-md" onClick={startQuiz}>Start</button>
        </div>
    );
}

export default StartScreen;
