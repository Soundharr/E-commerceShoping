// import React, { useState } from "react";
// import { MdDeleteForever } from "react-icons/md";
// import { FaEdit } from "react-icons/fa";
// import { IoPersonAdd } from "react-icons/io5";
// import { IoIosAddCircle } from "react-icons/io";

// const TodoApp = ({ user }) => {
//   let [items, setItems] = useState([
//     { id: 1, lable: "HTML & CSS", checked: true },
//     { id: 2, lable: "JAVASCRIPT", checked: true },
//     { id: 3, lable: "REACT JS", checked: false },
//   ]);

//   let [newItem, setNewItem] = useState("");
//   let handleChecked = (id) => {
//     let newListItems = items.map((item) =>
//       item.id === id ? { ...item, checked: !item.checked } : item
//     );
//     setItems(newListItems);
//   };
//   let [isEditing, setisediting] = useState(false);

//   let handleUpdate = (id) => {
//     let listItem = items.find((item) => item.id === id);
//     console.log(listItem);
//     setNewItem(listItem.lable);
//     setisediting(true);
//     setcurrentEleId(id);
//   };
//   let handleDelete = (id) => {
//     let deleteItem = items
//       .filter((item) => item.id !== id)
//       .map((item, index) => {
//         return { ...item, id: index + 1 };
//       });
//     setItems(deleteItem);
//   };
//   let [currentEleId, setcurrentEleId] = useState(null);
//   let handleaddorsaveItem = () => {
//     if (isEditing) {
//       let newlist = items.map((item) => {
//         return item.id === currentEleId ? { ...item, lable: newItem } : item;
//       });
//       setItems(newlist);
//       setcurrentEleId(null);
//       setNewItem("");
//       setisediting(false);
//     } else {
//       setItems([
//         ...items,
//         { id: items.length + 1, lable: newItem, checked: false },
//       ]);
//       setNewItem("");
//     }
//   };

//   return (
//     <main>
//       <div>
//         <input
//           type="text"
//           value={newItem}
//           placeholder="Add a new item"
//           onChange={(e) => {
//             setNewItem(e.target.value);
//           }}
//         />
//         <button onClick={handleaddorsaveItem}>
//           {isEditing ? <IoIosAddCircle /> : <IoPersonAdd />}
//         </button>
//       </div>
//       <ul>
//         {items.map((item) => {
//           return (
//             <li key={item.id} className="main">
//               <input
//                 type="checkbox"
//                 checked={item.checked}
//                 onChange={() => handleChecked(item.id)}
//               />
//               <label>{item.lable}</label>
//               <FaEdit
//                 role="button"
//                 tabIndex={0}
//                 onClick={() => handleUpdate(item.id)}
//               />
//               <MdDeleteForever
//                 role="button"
//                 tabIndex={0}
//                 onClick={() => handleDelete(item.id)}
//               />
//             </li>
//           );
//         })}
//       </ul>
//     </main>
//   );
// };

// export default TodoApp;

import React, { useState } from "react";
import { FaEdit, FaSave, FaTrash, FaPlus } from "react-icons/fa";

const TodoApp = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Add new note
  const handleAddNote = () => {
    if (newNote.trim() === "") return;
    setNotes([...notes, { id: Date.now(), text: newNote.trim() }]);
    setNewNote("");
  };

  // Delete note
  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Start editing
  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Save edited note
  const handleSave = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, text: editingText } : note
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", padding: 20 }}>
      <h2>Temporary Notes CRUD</h2>

      <div style={{ display: "flex", marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Add a new note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          style={{ flexGrow: 1, padding: "8px" }}
        />
        <button
          onClick={handleAddNote}
          style={{
            marginLeft: 8,
            padding: "8px 12px",
            cursor: "pointer",
            backgroundColor: "#2874f0",
            border: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <FaPlus /> Add
        </button>
      </div>

      {notes.length === 0 && <p>No notes yet. Add one above!</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map(({ id, text }) => (
          <li
            key={id}
            style={{
              backgroundColor: "#f5f5f5",
              padding: 10,
              marginBottom: 10,
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {editingId === id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={{ flexGrow: 1, padding: "6px" }}
                />
                <button
                  onClick={() => handleSave(id)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#28a745",
                    border: "none",
                    color: "white",
                    padding: "6px 10px",
                  }}
                  title="Save"
                >
                  <FaSave />
                </button>
              </>
            ) : (
              <>
                <p style={{ flexGrow: 1, margin: 0, wordBreak: "break-word" }}>
                  {text}
                </p>
                <button
                  onClick={() => handleEdit(id, text)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#ffc107",
                    border: "none",
                    color: "white",
                    padding: "6px 10px",
                  }}
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#dc3545",
                    border: "none",
                    color: "white",
                    padding: "6px 10px",
                  }}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
