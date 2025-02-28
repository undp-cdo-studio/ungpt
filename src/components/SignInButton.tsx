import { handleSignIn } from "@/auth";
import { useState } from "react";

export default function SignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const result = await handleSignIn();
      console.log("Sign in result:", result);
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <button
      type="button"
      className="rounded-md bg-[#0468b1] px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? "Signing in..." : "Sign In"}
    </button>
  );
}
