
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Scan, Search, History } from "lucide-react";

const BottomNavBar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 px-4">
      <Link
        to="/dashboard"
        className={`flex flex-col items-center justify-center w-1/3 py-1 ${
          isActive("/dashboard") 
            ? "text-black font-medium" 
            : "text-gray-500"
        }`}
      >
        <Scan size={24} />
        <span className="text-xs mt-1">Scan</span>
      </Link>
      
      <Link
        to="/search"
        className={`flex flex-col items-center justify-center w-1/3 py-1 ${
          isActive("/search") 
            ? "text-black font-medium" 
            : "text-gray-500"
        }`}
      >
        <Search size={24} />
        <span className="text-xs mt-1">Search</span>
      </Link>
      
      <Link
        to="/history"
        className={`flex flex-col items-center justify-center w-1/3 py-1 ${
          isActive("/history") 
            ? "text-black font-medium" 
            : "text-gray-500"
        }`}
      >
        <History size={24} />
        <span className="text-xs mt-1">History</span>
      </Link>
    </nav>
  );
};

export default BottomNavBar;
