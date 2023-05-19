"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  formatPrice?: boolean;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-600 absolute top-5 left-2"
        />
      )}
      <input
        type={type}
        id={id}
        disabled={disabled}
        {...register(id, {
          required,
          minLength: {
            value: type === "text" ? 2 : type === "password" ? 8 : 0,
            message: `Please enter at least ${type === "text" && "2"} ${
              type === "password" && "8"
            } characters`,
          },
          pattern: {
            value:
              type === "email"
                ? /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                : type === "text"
                ? /^[a-zA-Z0-9 ]+$/
                : /^.{1,50}$/,
            message: type === "email" ? "Invalid email" : "Invalid characters",
          },
        })}
        placeholder=" "
        className={`peer w-full p-3 pt-6 font-light bg-white border rounded-lg outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
        ${formatPrice ? "pl-9" : "pl-4"}
        ${errors[id] ? "border-rose-500" : "border-neutral-400"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-neutral-700"}`}
      />
      <label
        htmlFor={id}
        className={`absolute text-neutral-500 text-md duration-300 transform -translate-y-4 top-5 z-10 origin-[0] scale-75 ${
          formatPrice ? "left-9" : "left-4"
        }
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 
        ${errors[id] ? "text-rose-500" : "text-zince-400"}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
