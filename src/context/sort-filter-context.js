import {
  createContext,
  useContext,
  useReducer, 
  useState
} from "react";
import { useEffect } from "react";
import {sortFilterInitialState, sortFilterReducer} from 'reducer';
import {useNote} from 'context';

const SortFilterContext = createContext();
const useSortFilter = () => useContext(SortFilterContext);

const SortFilterProvider = ({children}) => {
  const {state:{labels}} = useNote();
  const [searchText, setSearchText] = useState("");
  const [sortFilterState, sortFilterDispatch] = useReducer(sortFilterReducer, sortFilterInitialState);

  useEffect(() => {
    const newLabel = labels.map(({ label, id }) => {
			const foundLabel = sortFilterState.filterBylabels.find(
				(filter) => filter.id === id
			);
			return foundLabel ? foundLabel : { id, label, filtered: false };
		});
		sortFilterDispatch({ type: "FILTER_BY_LABELS", payload: { filterBylabels: newLabel } });
  }, [labels]);

  const searchHandler = (e) => setSearchText(e.target.value);
 
  return(
    <SortFilterContext.Provider value={{sortFilterState, sortFilterDispatch, searchText, searchHandler}}>
      {children}
    </SortFilterContext.Provider>
  )
}

export {SortFilterProvider, useSortFilter};
