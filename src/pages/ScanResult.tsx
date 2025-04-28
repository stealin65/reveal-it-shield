
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useScan } from "../contexts/ScanContext";
import { Button } from "@/components/ui/button";

const ScanResult: React.FC = () => {
  const navigate = useNavigate();
  const { scannedProduct, getColorByScore, getMessageByScore } = useScan();

  useEffect(() => {
    // If there's no scanned product, redirect to dashboard
    if (!scannedProduct) {
      navigate("/dashboard");
    }
  }, [scannedProduct, navigate]);

  if (!scannedProduct) {
    return null; // Will redirect via useEffect
  }

  const colorClass = getColorByScore(scannedProduct.score);
  const message = getMessageByScore(scannedProduct.score);

  return (
    <div className={`flex flex-col h-screen ${colorClass}`}>
      {/* Score Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-4xl font-bold mb-3">{scannedProduct.name}</h2>
        
        <div className="my-8 transform scale-125 animate-pulse-subtle">
          <div className="text-7xl font-bold mb-2">
            {scannedProduct.score}
            <span className="text-3xl font-normal">/100</span>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-8">{message}</h3>
        
        <div className="w-full max-w-md bg-white/90 rounded-xl p-5 shadow-lg">
          <h4 className="font-bold mb-3">Ingredients:</h4>
          <ul className="text-sm list-disc pl-5 space-y-1">
            {scannedProduct.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action buttons */}
      <div className="p-6 pb-12">
        <Button
          onClick={() => navigate("/dashboard")}
          className="w-full h-14 bg-black text-white hover:bg-black/90"
        >
          Scan Another Product
        </Button>
      </div>
    </div>
  );
};

export default ScanResult;
