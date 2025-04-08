const Sessions = ({ completedSessions }) => {
  return (
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Pomodoro Stats</h2>
      <p className="text-lg text-gray-700">
        ✅ Completed Pomodoro Sessions:{" "}
        <span className="font-bold text-green-600">{completedSessions}</span>
      </p>
    </div>
  );
};

export default Sessions;
