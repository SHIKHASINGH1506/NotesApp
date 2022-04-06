import {
  createContext,
  useContext,
  useReducer
} from "react";
import {sortFilterInitialState, sortFilterReducer} from 'reducer';

const SortFilterContext = createContext();
const useSortFilter = () => useContext(SortFilterContext);

const SortFilterProvider = ({children}) => {
  const [sortFilterState, sortFilterDispatch] = useReducer(sortFilterReducer, sortFilterInitialState);
  return(
    <SortFilterContext.Provider value={{sortFilterState, sortFilterDispatch}}>
      {children}
    </SortFilterContext.Provider>
  )
}

export {SortFilterProvider, useSortFilter};
