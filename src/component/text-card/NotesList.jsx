import {Card} from './Card';

export const NotesList = ({ notes, editNoteFocusHandler }) => {
  return (
    (<div className="notes-container d-flex flex-col">
      {notes.map(note =>
        <Card
          noteData={note}
          key={note._id}
          editNoteFocusHandler={editNoteFocusHandler}
          //pinHandler={(e) => pinHandler(e, note._id)}
        />
      )}
    </div>)
  )
}