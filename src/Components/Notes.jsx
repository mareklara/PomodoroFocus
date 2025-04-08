import React from "react";
import { useState } from "react";

const Notes = ({ onSaveNotes }) => {
  const [noteText, setNoteText] = useState("");
  const [noteTag, setNoteTag] = useState(""); // ← NEW

  const handleSave = () => {
    if (noteText.trim() === "") return;

    const newNotes = {
      text: noteText,
      tag: noteTag, // ✅ save tag too
      timestamp: new Date().toLocaleString(),
    };

    onSaveNotes(newNotes);
    setNoteText("");
    setNoteTag(""); // clear tag too
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Write a Note</h2>
      <textarea
        className="w-full border p-2 rounded mb-2"
        rows={6}
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write your thoughts here..."
      />

    <input
      type="text"
      className="w-full border p-2 rounded mb-2"
      placeholder="Enter a tag (optional)"
      value={noteTag}
      onChange={(e) => setNoteTag(e.target.value)}
    />
    
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Note
      </button>
    </div>
  );
};

export default Notes;
