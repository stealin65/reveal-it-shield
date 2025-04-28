
import React from "react";
import { Scan } from "lucide-react";

interface ScanButtonLargeProps {
  onClick: () => void;
}

const ScanButtonLarge: React.FC<ScanButtonLargeProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="scan-button bg-black text-white rounded-full w-56 h-56 flex flex-col items-center justify-center text-center"
    >
      <Scan size={56} className="mb-3" />
      <span className="text-xl font-medium">Start Scanning</span>
    </button>
  );
};

export default ScanButtonLarge;
