import { loginUser, signupUser } from './auth-service'
import { getNotes, addNote, editNote, deleteNote } from './note-service'
import { getAllArchiveNotes, archiveNote, unArchiveNote, deleteArchiveNote, updateArchiveNote } from './archive-service';
import { deleteFromTrash, restoreFromTrash, getNotesFromTrash } from './trash-service';


export { loginUser, signupUser, getNotes, addNote, editNote, deleteNote, archiveNote, unArchiveNote, deleteArchiveNote, updateArchiveNote, getNotesFromTrash, deleteFromTrash, restoreFromTrash, getAllArchiveNotes };