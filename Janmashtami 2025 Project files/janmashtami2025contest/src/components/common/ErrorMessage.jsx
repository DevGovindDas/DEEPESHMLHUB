import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({
  message,
  type = "error",
  className = "",
  onDismiss,
}) => {
  const typeClasses = {
    error: "bg-red-100 border-red-400 text-red-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
    info: "bg-blue-100 border-blue-400 text-blue-700",
    success: "bg-green-100 border-green-400 text-green-700",
  };

  const typeIcons = {
    error: "⚠️",
    warning: "⚠️",
    info: "ℹ️",
    success: "✅",
  };

  if (!message) return null;

  return (
    <div className={`p-3 border rounded-md ${typeClasses[type]} ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">
          {typeIcons[type]} {message}
        </p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-2 text-sm underline hover:no-underline"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["error", "warning", "info", "success"]),
  className: PropTypes.string,
  onDismiss: PropTypes.func,
};

export default ErrorMessage;
