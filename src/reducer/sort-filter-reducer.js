const sortFilterInitialState = {
  sortBy: '',
  filterBylabels: [],
  sortByPriority: '',
}
const sortFilterReducer = (state, action) => {
  const {
    type,
    payload:{
      sortBy,
      filterBylabels,
      sortByPriority
  }} = action;
  
  switch(type){
    case 'SORT_BY':
      return {
        ...state,
          sortBy
      }
    case 'FILTER_BY_LABELS':
      return{
        ...state,
        filterBylabels
      }
    case 'CLEAR_FILTER':
      return{
        ...state,
        sortBy,
        filterBylabels
      }
    case 'SORT_BY_PRIORITY':
      return {
        ...state,
        sortByPriority
      }
  }

}
export { sortFilterReducer, sortFilterInitialState };