import { getFilteredBySearchText } from './getFilteredBySearchText';
import { getFilteredByLabels } from './getFilteredByLabels';
import { getSortedNotes } from './getSortedNotes';

export const getFilteredSortedNotes = (notes, filterBylabels, sortBy, searchText) => {
  const foundSearchNotes = getFilteredBySearchText(notes, searchText);
  const foundLabeledNotes = getFilteredByLabels(foundSearchNotes, filterBylabels);
  const foundSortedNotes = getSortedNotes(foundLabeledNotes, sortBy);
  return foundSortedNotes;
}