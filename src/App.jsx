import { useState } from "react";
import "./App.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Add icons to the library
library.add(faPencilAlt, faDeleteLeft);

export default function App() {
  const [notes, setNotes] = useState([]);

  function publish(event) {
    // Stop form from submitting and changing page when the user presses the button
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("title");
    const tag = formData.get("tag");
    setNotes([...notes, { title, tag, priority: 0 }]);

    event.target.reset();
  }

  function deleteNote(index) {
    console.log(`Index: ${index}`);
    let newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  }

  // Increments the priroty of the note when clicked, once it hits 3 it resets to zero
  function incrementPriority(index) {
    setNotes(
      notes.map((note, i) =>
        // checks if the index of the map method is the same as the note, if so it increases the priority if it's below 3.
        i === index
          ? {
              ...note,
              priority: note.priority < 3 ? note.priority + 1 : 0,
            }
          : note
      )
    );
  }

  function toggleCompletion(index) {
    setNotes(
      notes.map((note, i) =>
        i === index
          ? {
              ...note,
              completed: !note.completed,
            }
          : note
      )
    );
  }

  function orderByPriority() {
    // orders the notes based on priority
    const sortedNotes = [...notes].sort((a, b) => b.priority - a.priority);
    setNotes(sortedNotes);
  }
  return (
    <>
      <div className="wrapper">
        <div className="header-area">
          <h2>Todo List</h2>
          <p>For all your note taking needs</p>
        </div>
        <div className="create-note">
          <form onSubmit={publish}>
            <input name="title" placeholder="Title" autoComplete="off" />
            <select name="tag">
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="shopping">Shopping</option>
            </select>
            <button type="submit">Create Note</button>
          </form>
        </div>
        <div className="notes-body">
          <div className="notes-list">
            <button className="priority-button" onClick={orderByPriority}>
              Sort by priority
            </button>
            {notes.map((note, index) => {
              return (
                <div
                  className="list-item"
                  onClick={() => toggleCompletion(index)}
                >
                  <div
                    className="priority"
                    onClick={() => incrementPriority(index)}
                  >
                    {"!".repeat(note.priority)}
                  </div>
                  <div className={`title ${note.completed ? "completed" : ""}`}>
                    {note.title}
                  </div>
                  <div className="tag">#{note.tag}</div>
                  <div className="actions">
                    <button
                      className="delete-button"
                      onClick={() => deleteNote(index)}
                    >
                      <FontAwesomeIcon
                        icon="delete-left"
                        size="sm"
                        color="black"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
