const sortFilterInitialState = {
  sortBy: '',
  categories: {}
}
const sortFilterReducer = (state, action) => {
  const {type, 
    payload: {
      sortBy
    }} = action;
  switch(type){
    case 'SORT_BY':
      return {
        ...state,
          sortBy
      }
  }

}
export { sortFilterReducer, sortFilterInitialState };