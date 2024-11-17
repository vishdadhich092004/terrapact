import { useEffect } from "react";
import { XCircle, CheckCircle } from "lucide-react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const Icon = type === "SUCCESS" ? CheckCircle : XCircle;
  const baseStyles =
    "fixed top-20 right-4 p-4 rounded-md shadow-sm max-w-sm w-full flex items-center gap-3 transition-all duration-300 ease-in-out z-[100]";

  const typeStyles =
    type === "SUCCESS"
      ? "bg-[#fae1dd] border border-[#fec89a] text-[#512601]"
      : "bg-red-50 border border-red-200 text-[#512601]";

  const iconStyles = type === "SUCCESS" ? "text-[#a24c02]" : "text-red-500";

  const buttonStyles =
    type === "SUCCESS"
      ? "text-[#512601] hover:bg-[#fec89a] rounded-full p-1 transition-colors duration-200"
      : "text-[#512601] hover:bg-red-100 rounded-full p-1 transition-colors duration-200";

  return (
    <div className={`toast-slide-in ${baseStyles} ${typeStyles}`}>
      <Icon className={`w-5 h-5 flex-shrink-0 ${iconStyles}`} />
      <span className="text-sm font-medium flex-grow">{message}</span>
      <button onClick={onClose} className={buttonStyles} aria-label="Close">
        <XCircle className="w-4 h-4" />
      </button>
    </div>
  );
}
