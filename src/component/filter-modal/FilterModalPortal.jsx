import ReactDOM from "react-dom";
import { FilterModal } from "component";

const FilterModalPortal = ({ filterFocusHandler }) => {
	return ReactDOM.createPortal(
		<FilterModal filterFocusHandler={filterFocusHandler} />,
		document.getElementById("portal")
	);
};

export { FilterModalPortal };