import './home.css';
import { Drawer, SearchBar, Card, NoteForm } from "component";
import {useNote} from 'context';

export const Home = () => {
  const {buttonFocus, state: {notes}} = useNote();
  return (
    <div className="wrapper">
      <div className="container d-flex">
        <Drawer />
        <div className="d-flex justify-center center-body">
          <div className="drawer-app-content">
            <header className="drawer-top-bar">
              <SearchBar />
            </header>
            <main className="home-page-body">
              <div className="fixed"></div>
              <div className="card-container">
                {buttonFocus 
                  ? <NoteForm />
                  : <div></div>
                }
              </div>
              {notes.length> 0 
                ?(<div className="notes-container d-flex flex-col">
                  {notes.map(note => <Card noteData={note} key={note._id}/>)}
                 </div>)
                : (<div className="no-notes-container">
                    <h5>Notes you add appear here</h5>
                  </div>)
              }
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}