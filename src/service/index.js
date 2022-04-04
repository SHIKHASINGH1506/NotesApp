import { loginUser, signupUser } from './auth-service'
import { getNotes, addNote, editNote, deleteNote } from './note-service'
import { archiveNote, unArchiveNote, deleteArchiveNote, updateArchiveNote } from './archive-service';


export { loginUser, signupUser, getNotes, addNote, editNote, deleteNote, archiveNote, unArchiveNote, deleteArchiveNote, updateArchiveNote };