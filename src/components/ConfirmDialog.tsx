interface Props {
  message: string;
  onClose: () => void;
}

export default function ConfirmDialog({ message, onClose }: Props) {
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}
