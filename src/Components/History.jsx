import { useState } from "react";

const History = ({ notes, onDelete, onEdit }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const startEditing = (index, currenttext) => {
    setEditingIndex(index);
    setEditText(currenttext);
  };

  const saveEdit = () => {
    if (editText.trim() === "") return;
    onEdit(editingIndex, editText);
    setEditingIndex(null);
    setEditText("");
  };

  // Style tag colors
  const getTagStyle = (tag) => {
    switch (tag?.toLowerCase()) {
      case "work":
        return "bg-blue-100 text-blue-700";
      case "personal":
        return "bg-green-100 text-green-700";
      case "idea":
        return "bg-yellow-100 text-yellow-700";
      case "break":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  // Get all unique tags from notes
  const allTags = [
    ...new Set(notes.map((note) => note.tag?.toLowerCase()).filter(Boolean)),
  ];

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Note History</h2>

      {/* Filter by tag */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by tag:</label>
        <select
          className="border p-2 rounded"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="all">All</option>
          {allTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Filtered Notes */}
      {notes.length === 0 ? (
        <p className="text-gray-500">No notes saved yet.</p>
      ) : (
        <ul className="space-y-4">
          {notes
            .filter((note) =>
              selectedTag === "all"
                ? true
                : note.tag?.toLowerCase() === selectedTag
            )
            .map((note, index) => (
              <li
                key={index}
                className="border p-4 rounded shadow-sm relative group"
              >
                <p className="text-sm text-gray-500 mb-2">{note.timestamp}</p>

                {/* Styled Tag */}
                {note.tag && (
                  <p
                    className={`text-xs inline-block px-2 py-1 rounded mb-2 ${getTagStyle(
                      note.tag
                    )}`}
                  >
                    {(() => {
                      const tag = note.tag.toLowerCase();
                      if (tag === "work") return "💼 Work";
                      if (tag === "idea") return "💡 Idea";
                      if (tag === "break") return "☕ Break";
                      if (tag === "personal") return "🧘 Personal";
                      return note.tag;
                    })()}
                  </p>
                )}

                {/* Editable Text Area */}
                {editingIndex === index ? (
                  <>
                    <textarea
                      className="w-full border p-2 rounded mb-2"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button
                      onClick={saveEdit}
                      className="text-green-500 mr-2 hover:text-green-700 text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <p>{note.text}</p>
                    <div className="absolute top-2 right-2 space-x-2 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => startEditing(index, note.text)}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default History;
