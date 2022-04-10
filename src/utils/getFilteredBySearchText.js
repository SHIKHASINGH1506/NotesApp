export const getFilteredBySearchText = (notes, searchText) => {
  const searchTextLowerCase = searchText.toLowerCase();
  const notesFilteredBySearchText = notes.filter((note) => {
    const noteTitle = note.title.toLowerCase();
    const noteContent = note.body.toLowerCase();
    const foundNote = noteTitle.includes(searchTextLowerCase) || noteContent.includes(searchTextLowerCase);
    return foundNote;
  });
  return notesFilteredBySearchText;
}