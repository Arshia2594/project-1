const ModalHOC = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-surface w-[450px] rounded-xl shadow-lg relative animate-scaleIn border border-border">
        
        {title && (
          <div className="px-5 py-3 border-b border-border text-textMain font-semibold">
            {title}
          </div>
        )}

        <button
          className="absolute top-3 right-4 text-textMuted hover:text-primary transition text-lg font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
export default ModalHOC;
