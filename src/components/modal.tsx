import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  // Close modal on ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Parent handles backdrop click
    >
      {/* Modal Container */}
      <div
        className="bg-white rounded-3xl w-full max-w-4xl relative shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="text-2xl text-primary-dark absolute top-6 right-4"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Modal Content */}
        <div className="space-y-4 rounded-3xl">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
