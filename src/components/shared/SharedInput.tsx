import { TextField, InputAdornment } from "@mui/material";

interface ReusableInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  width?: string | number;
  multiline?: boolean;
  rows?: string | number;
  color?: string | number;
  sx?: any;
  required?: boolean;
}

const SharedInput = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  startIcon,
  multiline,
  rows,
  endIcon,
  color = "#ffffff",
  width = "100%",
  sx = {},
  required = false,
}: ReusableInputProps) => {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      type={type}
      value={value}
      multiline={multiline}
      rows={rows}
      onChange={onChange}
      required={required}
      fullWidth={width === "100%"}
      sx={{
        width,
        "& .MuiOutlinedInput-root": {
          color: color,
        },

        "& .MuiInputBase-input::placeholder": {
          color: "#9ca3af",
          opacity: 1,
        },

        "& .MuiInputLabel-root": {
          color: "#ccc",
        },

        "& .MuiInputLabel-root.Mui-focused": {
          color: "var(--color-black-200)",
        },

        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "#666",
        },

        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--color-black-200)",
        },

        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "rgba(255,255,255,0.5)",
          },

        ...sx,
      }}
      InputProps={{
        startAdornment: startIcon ? (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ) : undefined,
        endAdornment: endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : undefined,
      }}
    />
  );
};

export default SharedInput;
