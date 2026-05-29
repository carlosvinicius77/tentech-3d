"use client";

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  rightElement?: React.ReactNode;
}

export default function FormField({
  label, id, type = "text", value, onChange, error, placeholder, required, autoComplete, rightElement,
}: FormFieldProps) {
  return (
    <div className="ff-group">
      <label htmlFor={id} className="ff-label">
        {label}
        {required && <span className="ff-required"> *</span>}
      </label>
      <div className="ff-input-wrap">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`ff-input${error ? " ff-input--error" : ""}`}
        />
        {rightElement && <div className="ff-right">{rightElement}</div>}
      </div>
      {error && <span className="ff-error">{error}</span>}
    </div>
  );
}
