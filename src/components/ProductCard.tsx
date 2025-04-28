
import React from "react";
import { useNavigate } from "react-router-dom";
import { useScan, Product } from "../contexts/ScanContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { setScannedProduct, getColorByScore } = useScan();
  
  const handleClick = () => {
    setScannedProduct(product);
    navigate("/scan-result");
  };
  
  // Convert timestamp to readable date
  const date = new Date(product.timestamp);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  
  // Get appropriate background color based on score
  const scoreClass = getColorByScore(product.score);
  
  return (
    <div 
      onClick={handleClick} 
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4 cursor-pointer"
    >
      <div className="flex items-center mb-2">
        <div className="flex-1">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
        <div className={`${scoreClass} h-12 w-12 rounded-full flex items-center justify-center font-bold text-sm`}>
          {product.score}
        </div>
      </div>
      
      <div className="text-xs text-gray-600">
        <p className="truncate">{product.ingredients.slice(0, 3).join(", ")} 
          {product.ingredients.length > 3 && "..."}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
