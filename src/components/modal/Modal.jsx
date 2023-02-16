import React from "react";

const Modal = ({ open, close, children }) => {
  if (!open) return null;

  return (
    <React.Fragment>
      <div className="overlay" onClick={close}></div>
      <div className="modal animate__animated animate__fadeIn animate__faster">
        {children}
      </div>
    </React.Fragment>
  );
};

export default Modal;
