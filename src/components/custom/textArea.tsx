import { InputLabel, FormHelperText } from "@mui/material";
import { textStyling } from "../../styles";
import { Textarea } from "../ui/textarea"; // Burada Textarea bileşenine uygun bir import yaptığınızı varsayarak

import { useTranslation } from "react-i18next";

interface ICustomTextFieldModel {
  label: string;
  value: string | number;
  change: (value: any) => void;
  hasErrorMessages?: boolean;
  errorMessages?: string[];
  name: string;
  disabled?: boolean;
}

export default function CustomTextField({
  label,
  name,
  change,
  hasErrorMessages,
  errorMessages,
  value,
  disabled,
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
      <Textarea
        name={name}
        value={value}
        onChange={change}
        disabled={disabled}
        placeholder={t("Type here...")}
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
