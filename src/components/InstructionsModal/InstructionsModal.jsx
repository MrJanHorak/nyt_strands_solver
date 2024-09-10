import './InstructionsModal.css';

function InstructionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>How to Use This App</h2>
        <p>Here are the instructions on how to use the app...</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default InstructionModal;