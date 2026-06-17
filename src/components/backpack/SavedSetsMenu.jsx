import Tippy from "@tippyjs/react";
import getIcon from "../utils/iconUtils";

const SavedSetsMenu = ({ children, options }) => {

  return <Tippy
    interactive
    duration={0}
    offset={[0,0]}
    placement="bottom"
    appendTo={document.body}
    content={
      <div className="saved-sets-menu">
        {options.map((option, i) => (
          <div key={i} className="saved-sets-menu__options" onClick={() => option.func()}>{option.title}</div>
        ))}
      </div>
    }
  >
    {children}
  </Tippy>
}

export default SavedSetsMenu;