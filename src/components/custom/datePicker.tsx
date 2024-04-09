import { InputLabel, FormHelperText } from "@mui/material";
import { Calendar as CalendarIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { useState } from "react";

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
  disabled?: boolean;
  hideError?: boolean;
  change: (value: Date) => void;
  hasErrorMessages: boolean;
  errorMessages: string[];
  toDate?: Date;
}

export default function CustomDateTimePicker({
  label,
  value,
  toDate,
  change,
  hideError,
  errorMessages,
  disabled = false,
  hasErrorMessages,
}: ICustomDateTimePickerModel) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <>
      <InputLabel sx={{ mb: 1 }} style={textStyling}>
        {label}
      </InputLabel>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              format(new Date(value), "dd MMMM yyyy", {
                locale: locales[language],
              })
            ) : (
              <span>{t("Pick a date")}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            toDate={toDate}
            selected={value}
            onSelect={(value) => {
              change(value);
              setIsOpen(false);
            }}
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
        !hideError && <div className="h-5" />
      )}
    </>
  );
}
