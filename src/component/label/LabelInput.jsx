import AddIcon from '@mui/icons-material/Add';

const LabelInput = ({ label, addLabelHandler, setlabelField, newFun }) => {
  return(
    <form onSubmit={addLabelHandler}>
      <div className="label-wrapper d-flex w-full items-center"
        onClick={e => e.stopPropagation()}>
        <input 
          className="label-input w-full" 
          type="text" 
          placeholder="Enter new label" 
          required="" 
          value={label}
          onChange={(e) =>  setlabelField(e)} />
        <button className="label-btn" type="submit">
          <AddIcon />
        </button>
      </div>
    </form>
  )
}

export {LabelInput}