
import React from "react";

interface OnboardingSlideProps {
  title: string;
  description?: string;
  image?: string;
  className?: string;
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  title,
  description,
  image,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center justify-center px-6 h-full ${className}`}>
      {image && (
        <div className="mb-8">
          <img src={image} alt={title} className="h-64 object-contain" />
        </div>
      )}
      
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      
      {description && (
        <p className="text-center text-gray-700 max-w-xs">{description}</p>
      )}
    </div>
  );
};

export default OnboardingSlide;
