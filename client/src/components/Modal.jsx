import React from "react";
import ReactDOM from "react-dom";

// render into the div with the id of modal
const Modal = (props) => {
  // not direct jsx as return value
  return ReactDOM.createPortal(
    //   first arg = jsx we want to display on screen

    // we dont want to have an hardcoded callback - modal should be reusable
    // specify what should happen when the user clicks outside of the inner modal
    <div className="ui dimmer modals visible active" onClick={props.onDismiss}>
      <div
        className="ui standart modal visible active"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        {/* pass in jsx fragments (jsx) */}
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    // reference to the element that i want to render this portal into
    // if to body it will override everything that we have set up
    document.getElementById("modal")
  );
};

export default Modal;
