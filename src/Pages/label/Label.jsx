import { useNote } from 'context';
import { NotesList, Drawer, SearchBar, AddNotePortal } from 'component';

const Label = () => {
  const { state: { labels, notes, archives, addFormFocus } } = useNote();
  const notesWithLabels = labels.map(({ id, label }) => {
    const otherNotesWithLabel = notes.reduce(
      (prev, currentNote) =>
        currentNote.tags.find((tag) => tag.labelId === id)
          ? [...prev, currentNote]
          : [...prev],
      []
    );
    const archivedNotesWithLable = archives.reduce(
      (prev, current) =>
        current.tags.find(tag => tag.labelId === id)
          ? [...prev, current]
          : [...prev],
      []
    );
    return { id, label, otherNotesWithLabel, archivedNotesWithLable };
  });

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
            {addFormFocus && <AddNotePortal/>}
            <div className="card-container" id="addPortal"></div>
              <div className="label-page-wrapper d-flex flex-col">
                {notesWithLabels.map(({ id, label, otherNotesWithLabel, archivedNotesWithLable }) => (
                  <div className="label-list d-flex flex-col" key={id}>
                    <h6>{label}</h6>
                    {otherNotesWithLabel.length > 0 &&
                       (<div className="notes-container d-flex flex-col">
                        <NotesList notes={otherNotesWithLabel} />
                      </div>)
                    }
                    {archivedNotesWithLable.length > 0 && 
                      (<div className="notes-container d-flex flex-col">
                        <NotesList notes={archivedNotesWithLable} />
                        </div>)
                    }
                  </div>
                ))}

              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
export { Label }