export const getSortedNotes = (notesData, sortBy) => {
  if (sortBy === "") return notesData;

  if (sortBy === "date created: latest") {
    return notesData.sort(
      (note1, note2) =>
        new Date(note2.createdOn) - new Date(note1.createdOn)
    );
  }
  return notesData.sort(
    (note1, note2) =>
      new Date(note1.createdOn) - new Date(note2.createdOn)
  );
}