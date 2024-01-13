import { InputLabel, FormHelperText } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { textStyling } from "../../styles";

interface ICustomDateTimePickerModel {
  label: string;
  value: any;
  change: any;
  hasErrorMessages: boolean;
  errorMessages: string[];
}

export default function CustomDateTimePicker({
  label,
  value,
  change,
  hasErrorMessages,
  errorMessages,
}: ICustomDateTimePickerModel) {
  return (
    <>
      <InputLabel
        id="demo-simple-select-label"
        sx={{ mb: 1 }}
        style={textStyling}
      >
        {label}
      </InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <DateTimePicker
            slotProps={{
              textField: { size: "small" },
            }}
            value={dayjs(value)}
            label=""
            onChange={(newValue) => {
              change(new Date(newValue.toString()));
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      {hasErrorMessages ? (
        <>
          {errorMessages?.map((item, key) => {
            <FormHelperText key={key} sx={{ color: "red", margin: 0 }}>
              {item}
            </FormHelperText>;
          })}
        </>
      ) : (
        <div className="h-5" />
      )}
    </>
  );
}
