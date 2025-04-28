
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BottomNavBar from "../components/BottomNavBar";
import { useScan } from "../contexts/ScanContext";
import { Search as SearchIcon } from "lucide-react";
import { toast } from "sonner";

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { mockScan, setScannedProduct, addToHistory } = useScan();
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      return;
    }
    
    try {
      setIsSearching(true);
      
      // Show searching toast
      toast("Searching", {
        description: "Looking up product information...",
        duration: 1500
      });
      
      // In a real app, this would search an API
      // For our MVP, we'll use the mock function with a fake barcode
      const fakeBarcode = searchTerm.replace(/\D/g, '').padEnd(13, '0').substring(0, 13);
      
      // Get product data
      const product = await mockScan(fakeBarcode);
      
      // Save product to context and history
      setScannedProduct(product);
      addToHistory(product);
      
      // Navigate to result screen
      navigate("/scan-result");
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Search failed", {
        description: "Please try again",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white pt-12 px-6 pb-4 shadow-sm">
        <h1 className="text-2xl font-bold">Product Search</h1>
      </div>

      {/* Search Form */}
      <div className="p-4 bg-white">
        <form onSubmit={handleSearch} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Enter a product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 flex-1"
          />
          <Button 
            type="submit" 
            disabled={isSearching} 
            className="h-12 bg-black text-white hover:bg-black/90"
          >
            <SearchIcon size={18} className="mr-2" />
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </form>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <SearchIcon size={64} className="text-gray-300 mb-4" />
        <p className="text-gray-500 mb-2">Search for any product</p>
        <p className="text-sm text-gray-400 max-w-xs">
          Enter a product name to check for hidden toxins and ingredients
        </p>
      </div>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
};

export default Search;
