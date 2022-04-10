export const getFilteredByLabels = (notes, filterByLabels) => {
	if (filterByLabels.every((filter) => !filter.filtered)) return notes;

    return filterByLabels.reduce((accum, { id, filtered }) => [
        ...accum, 
        ...notes.filter(note => filtered && 
          !accum.find(({ _id }) => note._id === _id) 
            ? note.tags.find(tag => tag.labelId === id) 
            : false
          )
        ], []); 
}