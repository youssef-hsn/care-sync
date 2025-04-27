import * as React from "react";
import { Input } from "@/components/atoms/input"; 
import { cn } from "@/lib/utils/shadcn";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/atoms/button";

const PasswordInput: React.FC<React.ComponentPropsWithoutRef<"input">> = ({
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pe-10", className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        onClick={toggleShowPassword}
        className="absolute inset-y-0 end-0 flex  items-center pe-3 focus:outline-none focus:bg-transparent"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <Eye/> : <EyeOff/>}
      </Button>
    </div>
  );
};

export { PasswordInput };