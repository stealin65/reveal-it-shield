
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import ScanButtonLarge from "../components/ScanButtonLarge";
import Logo from "../components/Logo";
import { useScan } from "../contexts/ScanContext";
import { toast } from "sonner";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { mockScan, setScannedProduct, addToHistory } = useScan();
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    try {
      setIsScanning(true);
      
      // Show scanning toast
      toast("Scanning", {
        description: "Please hold still...",
        duration: 1000
      });
      
      // In a real app, this would activate the device camera
      // For our MVP, we'll simulate scanning with a random barcode
      const randomBarcode = Math.floor(Math.random() * 9000000000000) + 1000000000000;
      
      // Get product data (in real app, this would use the scanned barcode)
      const product = await mockScan(randomBarcode.toString());
      
      // Save product to context and history
      setScannedProduct(product);
      addToHistory(product);
      
      // Navigate to result screen
      navigate("/scan-result");
    } catch (error) {
      console.error("Scanning error:", error);
      toast.error("Scanning failed", {
        description: "Please try again",
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="pt-12 px-6 pb-6">
        <Logo className="mx-auto" />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <h2 className="text-xl font-medium text-center mb-10">Ready to Scan?</h2>
        <ScanButtonLarge onClick={handleScan} />
      </div>
      
      {/* Bottom Navigation */}
      <div className="pb-16"> {/* Space for the bottom nav */}
        <BottomNavBar />
      </div>
    </div>
  );
};

export default Dashboard;
