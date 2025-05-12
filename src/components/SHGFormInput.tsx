
import React from 'react';
import { Input } from '@/components/ui/input';

interface SHGFormInputProps {
  label: string;
  inputType?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  required?: boolean;
  readOnly?: boolean;
  options?: { value: string, label: string }[];
}

const SHGFormInput: React.FC<SHGFormInputProps> = ({ 
  label, 
  inputType = "text", 
  value, 
  onChange, 
  placeholder, 
  prefix, 
  suffix,
  required = false,
  readOnly = false,
  options = []
}) => {
  return (
    <tr className="border border-gray-300">
      <td className="p-3 bg-gray-100 font-medium border-r border-gray-300 w-1/3">
        {label}:
      </td>
      <td className="p-2">
        <div className="flex items-center">
          {prefix && (
            <span className="px-2">{prefix}</span>
          )}
          
          {inputType === "select" ? (
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              value={value}
              onChange={onChange as any}
              required={required}
            >
              {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          ) : (
            <Input
              type={inputType}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required={required}
              readOnly={readOnly}
            />
          )}
          
          {suffix && (
            <span className="px-2">{suffix}</span>
          )}
        </div>
      </td>
    </tr>
  );
};

export default SHGFormInput;
