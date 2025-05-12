
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
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex items-center rounded-xl overflow-hidden border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-shg-primary/30 focus-within:border-transparent transition-all">
        {prefix && (
          <span className="px-3 text-gray-500 bg-gray-50 border-r border-gray-300 h-full flex items-center">{prefix}</span>
        )}
        
        {inputType === "select" ? (
          <select 
            className="w-full py-3 px-4 focus:outline-none bg-white"
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
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 py-3 px-4"
          />
        )}
        
        {suffix && (
          <span className="px-3 text-gray-500 bg-gray-50 border-l border-gray-300 h-full flex items-center">{suffix}</span>
        )}
      </div>
    </div>
  );
};

export default SHGFormInput;
