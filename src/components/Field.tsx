import { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface FieldProps {
  label: string;
  children?: ReactNode;
  required?: boolean;
  className?: string;
}

interface TextFieldProps extends FieldProps {
  type?: "text" | "number" | "email";
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

interface SelectFieldProps extends FieldProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  showOther?: boolean;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

interface TextAreaFieldProps extends FieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
}

export function Field({ label, children, required = false, className = "" }: FieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
    </div>
  );
}

export function TextField({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  disabled = false, 
  required = false,
  className = ""
}: TextFieldProps) {
  return (
    <Field label={label} required={required} className={className}>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="touch-target"
      />
    </Field>
  );
}

export function SelectField({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder = "Select option...", 
  disabled = false, 
  required = false,
  showOther = true,
  otherValue = "",
  onOtherChange,
  className = ""
}: SelectFieldProps) {
  const isOtherSelected = value === "Other" || value === "Custom (enter)";

  return (
    <Field label={label} required={required} className={className}>
      <div className="space-y-2">
        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger className="touch-target">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {isOtherSelected && showOther && onOtherChange && (
          <Input
            type="text"
            value={otherValue}
            onChange={(e) => onOtherChange(e.target.value)}
            placeholder="Please specify..."
            className="touch-target"
          />
        )}
      </div>
    </Field>
  );
}

export function TextAreaField({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  disabled = false, 
  required = false,
  rows = 3,
  className = ""
}: TextAreaFieldProps) {
  return (
    <Field label={label} required={required} className={className}>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className="touch-target resize-none"
      />
    </Field>
  );
}