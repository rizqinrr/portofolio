interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  image: string;
}

export default function GalleryModal({
  isOpen,
  onClose,
  title,
  subtitle,
  image,
}: GalleryModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop show"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: 1050,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-lg"
        style={{ maxWidth: '800px', width: '100%', margin: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content bg-dark text-white border-0 shadow-lg">
          <div className="modal-header border-secondary">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center p-3">
            <img
              src={image}
              alt={title}
              className="img-fluid rounded"
              style={{ maxHeight: '70vh', objectFit: 'contain' }}
            />
            {subtitle && <p className="mt-3 mb-0 text-light">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
