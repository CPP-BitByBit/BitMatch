import PropTypes from "prop-types";


const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
          <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
            ✕
          </button>
          <div>{children}</div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  