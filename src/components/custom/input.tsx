import { InputLabel, FormHelperText } from "@mui/material";
import { textStyling } from "../../styles";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";

interface ICustomTextFieldModel {
  label: string;
  multiple?: boolean;
  value: string | number;
  change: (value: any) => void;
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
  multiple,
  hasErrorMessages,
  errorMessages,
  value,
  type = "text",
  disabled,
  placeholder,
}: ICustomTextFieldModel) {
  const { t } = useTranslation();

  return (
    <>
      <InputLabel
        id="demo-simple-select-label"
        sx={{ mb: 1 }}
        style={textStyling}
      >
        {label}
      </InputLabel>
      <Input
        multiple={multiple}
        name={name}
        type={type}
        value={value}
        onChange={change}
        disabled={disabled}
        className={type === "file" && "cursor-pointer"}
        title="Test"
        placeholder={t(placeholder ?? "Type here...")}
        onWheel={(e) => e.currentTarget.blur()}
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
