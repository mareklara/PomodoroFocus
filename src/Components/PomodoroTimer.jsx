import React from "react";
import Notes from "./Notes"; // Import the Notes component

const PomodoroTimer = ({
  isRunning,
  setIsRunning,
  isBreak,
  timeLeft,
  formatTime,
  handleReset,
}) => {
  return (
    <div className="text-center">
      <div className="mb-6 text-center">
        <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base">
          <strong>Pomodoro Technique:</strong> A productivity method that breaks
          work into focused 24-minute intervals followed by 5-minute breaks.
          Helps maintain concentration and reduce mental fatigue.
        </p>
      </div>

      <h1 className="text-2xl font-bold mb-2">
        {isBreak ? "Break Time!" : "Focus Time"}
      </h1>
      <h2 className="text-4xl font-mono mb-4">{formatTime()}</h2>
      <div className="space-x-2">
        <button
          onClick={() => setIsRunning(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Start
        </button>
        <button
          onClick={() => setIsRunning(false)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Stop
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
