import * as React from "react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, ...props }) => {
  return (
    <Button
      type="submit"
      className="bg-[#CBB5A7] text-gray-800 rounded-md px-6 transition duration-200 ease-in-out hover:bg-[#CBB5A7]/80"
      {...props}
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
