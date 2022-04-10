export const getSortedNotes = (notesData, sortBy, sortByPriority) => {
  if (sortBy === "" && sortByPriority==="") return notesData;
  const sortedByTime = getSortedByTime(notesData, sortBy);
  const sortedByPriority = getSortedByPriority(sortedByTime, sortByPriority);
  return sortedByPriority;
}
const getSortedByTime = (notesData, sortBy) => {
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
const mapPriorities = (priority, sortByPriority) => {
	switch (priority) {
		case "HIGHNONE":
		case "HIGHLOW":
		case "HIGHMEDIUM":
		case "MEDIUMNONE":
		case "MEDIUMLOW":
		case "LOWNONE":
			return sortByPriority === "High to Low" ? -1 : 1;

		default:
			return sortByPriority === "High to Low" ? 1 : -1;
	}
};

const getSortedByPriority = (notesData, sortByPriority) => {
  if (sortByPriority === "") return notesData;

		return notesData.sort((note1, note2) => {
			if (note1.priority === note2.notepriority) return 0;

			return mapPriorities(
				note1.priority.toUpperCase() + note2.priority.toUpperCase(),
				sortByPriority
			);
		});
}