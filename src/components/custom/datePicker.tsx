import { InputLabel, FormHelperText } from "@mui/material";
import { Calendar as CalendarIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

import { textStyling } from "../../styles";
import { locales } from "@/constants";
import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ICustomDateTimePickerModel {
  label: string;
  value: Date;
  change: (value: Date) => void;
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
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <>
      <InputLabel
        id="demo-simple-select-label"
        sx={{ mb: 1 }}
        style={textStyling}
      >
        {label}
      </InputLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              format(new Date(value), "PPP", {
                locale: locales[language],
              })
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={change}
            initialFocus
          />
        </PopoverContent>
      </Popover>
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