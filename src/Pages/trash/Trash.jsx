import { Drawer, SearchBar, Card } from "component";
import { useNote } from "context";
const Trash = () => {
  const {
    state: {
      trash
    },
  } = useNote();
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
              {trash.length > 0
                ? (<div className="notes-container d-flex flex-col">
                  {trash.map(note =>
                    <Card
                      noteData={note}
                      key={note._id}
                    />
                  )}
                </div>)
                : (<div className="no-notes-container">
                  <h5>Notes you add in trash appear here</h5>
                </div>)
              }
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
export { Trash }