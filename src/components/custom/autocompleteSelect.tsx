import { InputLabel, FormHelperText } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FaCaretDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { CheckIcon } from "lucide-react";
import { isNil } from "lodash";

import { apiService } from "@/server/apiServer";
import { useModal } from "@/hooks/useModal";
import { textStyling } from "../../styles";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

interface ICustomAutocompleteSelectProps {
  value: string | number;
  change: (value: string) => void;
  api?: string;
  label: string;
  refetech?: boolean;
  optionLabel: string;
  disabled?: boolean;
  staticOptions?: { value: string; label: string }[];
  errorMessages: string[];
  hasErrorMessages: boolean;
}

export default function CustomAutocompleteSelect({
  api,
  label,
  value,
  change,
  refetech,
  optionLabel,
  errorMessages,
  staticOptions,
  hasErrorMessages,
  disabled = false,
}: ICustomAutocompleteSelectProps) {
  const [options, setOptions] = useState(staticOptions ?? null);
  const [open, setOpen] = useState(false);
  const { onClose } = useModal();
  const { t } = useTranslation();

  const fetchData = async () => {
    const res = await apiService.get(api);

    const data = res.data.items
      .map((x) => ({
        label: x[optionLabel],
        value: x.id,
      }))
      .filter((item) => item.label && item.value);

    setOptions(data);
  };

  useEffect(() => {
    if (!staticOptions) fetchData();
  }, []);

  useEffect(() => {
    if (refetech) {
      setOptions([]);
      fetchData();
      onClose();
    }
  }, [refetech]);

  return (
    <>
      <InputLabel sx={{ mb: 1 }} style={textStyling}>
        {label}
      </InputLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between gap-x-2"
          >
            {value
              ? options?.find((option) => option.value == value)?.label
              : t("Select option")}
            <FaCaretDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full popover-content-width-same-as-its-trigger p-0">
          <Command
            filter={(value, search) => {
              return options
                ?.find((o) => o.value == value)
                ?.label.toLowerCase()
                .includes(search.toLowerCase())
                ? 1
                : 0;
            }}
          >
            <CommandInput placeholder={t("Search option...")} className="h-9" />
            <CommandGroup>
              <CommandItem disabled value={""} className="hidden last:block">
                {isNil(options) ? t("Loading...") : t("No item found")}
              </CommandItem>
              {options?.map((option) => (
                <CommandItem
                  key={option.value}
                  value={String(option.value)}
                  onSelect={(currentValue) => {
                    change(currentValue == value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value == option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {hasErrorMessages ? (
        <>
          {errorMessages?.map((item, key) => (
            <FormHelperText
              key={key}
              sx={{ color: "red", margin: 0, height: 20 }}
            >
              {item}
            </FormHelperText>
          ))}
        </>
      ) : (
        <div className="w-full h-5 " />
      )}
    </>
  );
}
