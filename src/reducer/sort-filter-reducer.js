const sortFilterInitialState = {
  sortBy: '',
  filterBylabels: []
}
const sortFilterReducer = (state, action) => {
  console.log(action)
  const {
    type,
    payload:{
      sortBy,
      filterBylabels
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
  }

}
export { sortFilterReducer, sortFilterInitialState };