type BackdropProps = {
  onClose: () => void;
  className?: string;
  "aria-label"?: string;
};

export function Backdrop({
  onClose,
  className = "",
  "aria-label": ariaLabel = "Close dialog",
}: BackdropProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`cursor-default border-0 bg-transparent p-0 ${className}`.trim()}
      onClick={onClose}
    />
  );
}
