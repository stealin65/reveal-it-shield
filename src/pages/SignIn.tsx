
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await signIn(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white p-6">
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate("/")}
          className="mr-4 rounded-full p-1 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <Logo size="md" />
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6">Welcome back</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="h-12"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 mt-6 bg-black text-white hover:bg-black/90"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-black font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
