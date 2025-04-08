import { useState, useEffect } from "react";
import "./App.css";
import SideBar from "./Components/SideBar";
import PomodoroTimer from "./Components/PomodoroTimer";
import Notes from "./Components/Notes";
import History from "./Components/History";
import ConfirmModal from "./Components/ConfirmModal";
import Sessions from "./Components/Sessions";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const [activeTab, setActiveTab] = useState("timer");

  const [notes, setNotes] = useState([]);
  const [completedSessions, setCompletedSessions] = useState(0);

  const [hasLoadedNotes, setHasLoadedNotes] = useState(false);

  // Load notes from local storage on initial render
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    setHasLoadedNotes(true); // ✅ mark that loading is done
  }, []);

  // Save notes to local storage whenever they change
  useEffect(() => {
    if (hasLoadedNotes) {
      console.log("✅ Saving notes to localStorage:", notes);
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes, hasLoadedNotes]);

  // Timer logic
  const [timeLeft, setTimeLeft] = useState(1440); // 24 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      if (isBreak) {
        setIsBreak(false);
        setTimeLeft(1440);
      } else {
        setIsBreak(true);
        setTimeLeft(300);
      }
    }
  }, [timeLeft, isRunning, isBreak]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(1440);
  };

  const handleSaveNotes = (newNotes) => {
    setNotes((prevNotes) => [newNotes, ...prevNotes]);
  };

  //delete notes button
  const handleDeleteClick = (index) => {
    setNoteToDelete(index);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setNotes((prevNotes) =>
      prevNotes.filter((_, index) => index !== noteToDelete)
    );
    setShowModal(false);
    setNoteToDelete(null);
  };

  //edit function
  const handleEditNote = (index, updatedText) => {
    setNotes((prevNotes) =>
      prevNotes.map((note, i) =>
        i === index ? { ...note, text: updatedText } : note
      )
    );
  };

  return (
    <div className="flex h-screen">
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-6">
        {activeTab === "timer" && (
          <PomodoroTimer
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            isBreak={isBreak}
            timeLeft={timeLeft}
            formatTime={formatTime}
            handleReset={handleReset}
          />
        )}
        {activeTab === "notes" && <Notes onSaveNotes={handleSaveNotes} />}
        {activeTab === "history" && (
          <History
            notes={notes}
            onDelete={handleDeleteClick}
            onEdit={handleEditNote}
          />
        )}
        {activeTab === "sessions" && (
          <Sessions completedSessions={completedSessions} />
        )}
      </main>
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default App;
