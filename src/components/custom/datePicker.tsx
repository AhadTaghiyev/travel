import { InputLabel, FormHelperText } from "@mui/material";
import { Calendar as CalendarIcon } from "lucide-react";
// import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";

import { textStyling } from "../../styles";
import { DEFAULT_YEAR, locales } from "@/constants";
import { cn, formatDate } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { YearContext } from "@/store/YearContext";

interface ICustomDateTimePickerModel {
  label: string;
  value: Date; // Tarih değeri her zaman gelir
  disabled?: boolean;
  hideError?: boolean;
  change: (value: Date) => void;
  hasErrorMessages: boolean;
  errorMessages: string[];
  toDate?: Date;
  showTime?: boolean; // Zaman seçimi için
  isStartDate?: boolean;
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
  showTime = false, // Varsayılan olarak `false`
  isStartDate = false,
}: ICustomDateTimePickerModel) {
  // const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { selectedYear } = useContext(YearContext);

  // Saat ve dakika bağımsız olarak "00:00" ile başlar
  const [selectedTime, setSelectedTime] = useState<{ hour: string; minute: string }>({
    hour: "00",
    minute: "00",
  });

  const handleDateChange = (date: Date, hour: string, minute: string) => {
    const updatedDate = new Date(date || (isStartDate ? new Date(String(selectedYear) === "All" ? Number(DEFAULT_YEAR) : Number(selectedYear), 0, 1) : new Date(String(selectedYear) === "All" ? new Date().getFullYear() : Number(selectedYear), 11, 31)));
    updatedDate.setHours(parseInt(hour, 10));
    updatedDate.setMinutes(parseInt(minute, 10));
    change(updatedDate); // Parent component'e gönder
  };

  const handleTimeChange = (time: { hour: string; minute: string }) => {
    setSelectedTime(time);
    const updatedDate = new Date(value || (isStartDate ? new Date(String(selectedYear) === "All" ? Number(DEFAULT_YEAR) : Number(selectedYear), 0, 1) : new Date(String(selectedYear) === "All" ? new Date().getFullYear() : Number(selectedYear), 11, 31))); // Tarih value'dan alınır
    updatedDate.setHours(parseInt(time.hour, 10));
    updatedDate.setMinutes(parseInt(time.minute, 10));
    change(updatedDate); // Güncellenmiş tarih ve zaman parent component'e gönderilir
  };

  useEffect(() => {
    if (value) {
      const hour = new Date(value).getHours().toString().padStart(2, "0"); // 2 basamaklı hale getir
      const minute = new Date(value).getMinutes().toString().padStart(2, "0"); // 2 basamaklı hale getir
      setSelectedTime({ hour, minute });
      handleDateChange(value || (isStartDate ? new Date(String(selectedYear) === "All" ? Number(DEFAULT_YEAR) : Number(selectedYear), 0, 1) : new Date(String(selectedYear) === "All" ? new Date().getFullYear() : Number(selectedYear), 11, 31)), hour, minute);
    } else {
      handleDateChange(value || (isStartDate ? new Date(String(selectedYear) === "All" ? Number(DEFAULT_YEAR) : Number(selectedYear), 0, 1) : new Date(String(selectedYear) === "All" ? new Date().getFullYear() : Number(selectedYear), 11, 31)), "00", "00");
    }
  }, [selectedYear, isStartDate]);

  useEffect(() => {
    console.log("value", new Date(value))
    console.log("isStartDate", isStartDate);
  }, [value])

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
              // Tarih ve zaman formatı kontrol ediliyor
              formatDate(
                typeof value === "string" ? new Date(value).toISOString() : value.toISOString(),
                showTime ? "dd MMMM yyyy HH:mm" : "dd MMMM yyyy",
                { locale: locales["en"] }
              ).replace(
                /(\d{2}:\d{2})/,
                (match) => {
                  const dateValue = typeof value === "string" ? new Date(value) : value;
                  return dateValue.getHours() === 0 && dateValue.getMinutes() === 0 ? "00:00" : match;
                }
              )
            ) : (
              <span>{formatDate(new Date(String(selectedYear) === "All" ? new Date().getFullYear() : Number(selectedYear), 11, 31).toISOString(), "dd MMMM yyyy")}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            defaultMonth={isStartDate ? new Date(String(selectedYear) === "All" ? Number(DEFAULT_YEAR) : Number(selectedYear), 0, 1) : new Date(String(selectedYear) === "All" ? new Date().getFullYear() : Number(selectedYear), 11, 31)}
            mode="single"
            // selected={new Date(selectedYear, 0, 1)}
            selected={value ? new Date(value) : isStartDate ? new Date(String(selectedYear) === "All" ? Number(DEFAULT_YEAR) : Number(selectedYear), 0, 1) : new Date(String(selectedYear) === "All" ? new Date().getFullYear() : Number(selectedYear), 11, 31)}
            toDate={toDate}
            onSelect={(date) => {
              console.log("inside", date)
              if (date) handleDateChange(date, selectedTime.hour, selectedTime.minute);
              setIsOpen(false);
            }}
            showTimePicker={showTime}
            selectedTime={selectedTime}
            onTimeChange={handleTimeChange} // Zaman değişikliklerini günceller
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {hasErrorMessages ? (
        <>
          {errorMessages?.map((item, key) => (
            <FormHelperText key={key} sx={{ color: "red", margin: 0 }}>
              {item}
            </FormHelperText>
          ))}
        </>
      ) : (
        !hideError && <div className="h-5" />
      )}
    </>
  );
}
