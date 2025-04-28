
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingSlide from "../components/OnboardingSlide";
import Logo from "../components/Logo";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Onboarding: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Are your everyday foods secretly harming you?",
      description: "Many products contain hidden ingredients that can affect your health over time."
    },
    {
      title: "Scan any product to reveal hidden dangers",
      description: "Our unique toxin detection system analyzes ingredients to protect you from harmful chemicals."
    },
    {
      title: "Protect your skin, smell, and health — starting today",
      description: "Get instant safety alerts and make informed decisions about what you put in and on your body."
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/signup");
    }
  };

  const handleSkip = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Logo section */}
      <div className="pt-12 pb-6 px-6">
        <Logo size="lg" className="mx-auto" />
        <p className="text-center text-sm text-gray-500 mt-2">See what they're hiding from you</p>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col justify-center">
        <OnboardingSlide
          title={slides[currentSlide].title}
          description={slides[currentSlide].description}
          className="animate-fade-in"
        />
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 my-6">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              currentSlide === index ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="px-6 pb-12 flex flex-col gap-4">
        <Button 
          onClick={handleNext}
          className="bg-black text-white hover:bg-black/90 flex items-center justify-center gap-2 h-12 w-full"
        >
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          <ChevronRight size={18} />
        </Button>
        
        {currentSlide < slides.length - 1 && (
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-gray-500"
          >
            Skip
          </Button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
