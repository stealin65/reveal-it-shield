
import React, { createContext, useContext, useState } from "react";

export interface Product {
  id: string;
  name: string;
  barcode: string;
  ingredients: string[];
  score: number;
  timestamp: number;
}

interface ScanContextType {
  scannedProduct: Product | null;
  scanHistory: Product[];
  setScannedProduct: (product: Product | null) => void;
  addToHistory: (product: Product) => void;
  getColorByScore: (score: number) => string;
  getMessageByScore: (score: number) => string;
  mockScan: (barcode: string) => Promise<Product>;
}

const ScanContext = createContext<ScanContextType | undefined>(undefined);

export const useScan = () => {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error("useScan must be used within a ScanProvider");
  }
  return context;
};

export const ScanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [scanHistory, setScanHistory] = useState<Product[]>(() => {
    const stored = localStorage.getItem("scanHistory");
    return stored ? JSON.parse(stored) : [];
  });

  // Function to determine color based on score
  const getColorByScore = (score: number): string => {
    if (score >= 90) return "bg-safety-very-safe";
    if (score >= 70) return "bg-safety-minor-concerns";
    if (score >= 50) return "bg-safety-warning-zone";
    if (score >= 30) return "bg-safety-danger-zone";
    return "bg-safety-extreme-danger";
  };

  // Function to get appropriate message based on score
  const getMessageByScore = (score: number): string => {
    if (score >= 90) return "✅ Safe and Clean!";
    if (score >= 70) return "⚠️ Minor Concerns";
    if (score >= 50) return "⚠️ Caution Recommended";
    if (score >= 30) return "⚠️ Toxins Detected!";
    return "❌ Extreme Danger!";
  };

  // Add product to history
  const addToHistory = (product: Product) => {
    const updatedHistory = [product, ...scanHistory].slice(0, 50); // Keep only 50 most recent
    setScanHistory(updatedHistory);
    localStorage.setItem("scanHistory", JSON.stringify(updatedHistory));
  };

  // Mock scan function for demo purposes
  const mockScan = async (barcode: string): Promise<Product> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo, generate random product data
    const mockProducts = [
      {
        name: "Organic Apple Juice",
        ingredients: ["Organic apple juice", "Vitamin C", "Citric acid"],
        score: 95,
      },
      {
        name: "Clean Beauty Face Cream",
        ingredients: ["Aloe vera", "Shea butter", "Coconut oil", "Jojoba oil"],
        score: 88,
      },
      {
        name: "Everyday Lotion",
        ingredients: ["Water", "Glycerin", "Fragrance", "Parabens", "Sodium laureth sulfate"],
        score: 62,
      },
      {
        name: "Daily Vitamin Supplement",
        ingredients: ["Vitamin A", "Vitamin D", "Gelatin", "Talc", "Yellow 5", "Red 40"],
        score: 45,
      },
      {
        name: "Ultra Shine Hairspray",
        ingredients: ["Alcohol Denat.", "Butane", "Propane", "Fragrance", "Formaldehyde", "Phthalates"],
        score: 20,
      }
    ];

    // Use last digit of barcode to select product (for demo purposes)
    const digit = parseInt(barcode.slice(-1)) || 0;
    const index = digit % mockProducts.length;
    const mockProduct = mockProducts[index];

    // Create a product object
    const product: Product = {
      id: `prod_${Date.now()}`,
      name: mockProduct.name,
      barcode,
      ingredients: mockProduct.ingredients,
      score: mockProduct.score,
      timestamp: Date.now()
    };

    return product;
  };

  return (
    <ScanContext.Provider
      value={{
        scannedProduct,
        scanHistory,
        setScannedProduct,
        addToHistory,
        getColorByScore,
        getMessageByScore,
        mockScan,
      }}
    >
      {children}
    </ScanContext.Provider>
  );
};
