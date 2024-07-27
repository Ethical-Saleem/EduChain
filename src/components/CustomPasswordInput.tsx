import React, { useState } from "react";

interface CustomPasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id?: string;
  className?: string;
}

const CustomPasswordInput: React.FC<CustomPasswordInputProps> = ({
  value,
  onChange,
  placeholder,
  id,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        className={`${className} custom-input border-gray-300 rounded-md`}
        onFocus={(e) => (e.currentTarget.style.borderColor = "red")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
      >
        {showPassword ? (
          <i className="pi pi-eye-slash"></i>
        ) : (
          <i className="pi pi-eye"></i>
        )}
      </button>
    </div>
  );
};

export default CustomPasswordInput;
