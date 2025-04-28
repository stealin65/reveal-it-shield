
import React from "react";
import { useScan } from "../contexts/ScanContext";
import BottomNavBar from "../components/BottomNavBar";
import ProductCard from "../components/ProductCard";

const History: React.FC = () => {
  const { scanHistory } = useScan();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white pt-12 px-6 pb-4 shadow-sm">
        <h1 className="text-2xl font-bold">Scan History</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 overflow-y-auto pb-20">
        {scanHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-gray-500 mb-2">No scan history yet</p>
            <p className="text-sm text-gray-400">
              Products you scan will appear here
            </p>
          </div>
        ) : (
          <>
            {scanHistory.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
};

export default History;
