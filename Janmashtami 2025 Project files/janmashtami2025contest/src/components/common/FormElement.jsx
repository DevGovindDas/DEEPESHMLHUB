import React from "react";
import PropTypes from "prop-types";

const FormElement = ({
  label = "Input Field",
  type = "text",
  name = "",
  placeholder = "",
  pattern,
  required = false,
  value,
  defaultValue,
  disabled = false,
  onChange,
}) => {
  const inputProps = {
    type,
    id: name,
    name,
    required,
    pattern,
    disabled,
    onChange,
    className: `form-input ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`,
    placeholder,
  };

  // Use either controlled or uncontrolled input
  if (value !== undefined) {
    inputProps.value = value;
  } else if (defaultValue !== undefined) {
    inputProps.defaultValue = defaultValue;
  }

  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input {...inputProps} />
    </div>
  );
};

FormElement.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
  required: PropTypes.bool,
};

export default FormElement;
