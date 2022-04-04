import { v4 as uuid } from "uuid";
import './color-pallete.css';

const ColorPallet = () => {
 const colors =[
  {
    id: uuid(),
    color: '#cfe1b9'
  },
  {
    id: uuid(),
    color: '#cfe1b9'  
  },
  {
    id: uuid(),
    color: '#cfe1b9'  
  },
  {
    id: uuid(),
    color: '#ccff90'  
  },
  {
    id: uuid(),
    color: '#fbbc04'  
  },
  {
    id: uuid(),
    color: '#fff475'  
  },
  {
    id: uuid(),
    color: '#a7ffeb'  
  },
  {
    id: uuid(),
    color: '#aecbfa'  
  },
  {
    id: uuid(),
    color: '#d7aefb'  
  },
  {
    id: uuid(),
    color: '#fdcfe8'  
  },
]

return (
  <div className="color-pallete d-flex">
    {colors.map(color => (
      <div className="color-box justify-center items-center">
        <button 
        className="color-btn"
        style={{backgroundColor: color.color}}></button>
      </div>
    ))}
  </div>
)
}
export {ColorPallet}