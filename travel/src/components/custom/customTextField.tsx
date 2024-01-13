import { InputLabel, TextField, FormHelperText } from "@mui/material";
import { textStyling } from "../../styles";

interface ICustomTextFieldModel {
  label: string;
  value: any;
  change: any;
  hasErrorMessages?: boolean;
  errorMessages?: string[];
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function CustomTextField({
  label,
  name,
  change,
  hasErrorMessages,
  errorMessages,
  value,
  type = "text",
  placeholder,
  disabled,
}: ICustomTextFieldModel) {
  return (
    <>
      <InputLabel
        id="demo-simple-select-label"
        sx={{ mb: 1 }}
        style={textStyling}
      >
        {label}
      </InputLabel>
      <TextField
        disabled={disabled}
        id="outlined-basic"
        variant="outlined"
        sx={{ width: "100%" }}
        style={textStyling}
        name={name}
        value={value}
        onChange={change}
        type={type}
        size="small"
        placeholder={placeholder}
      />
      {hasErrorMessages ? (
        <>
          {errorMessages?.map((item, key) => (
            <FormHelperText key={key} sx={{ color: "red", margin: 0 }}>
              {item}
            </FormHelperText>
          ))}
        </>
      ) : (
        <div className="h-5" />
      )}
    </>
  );
}
