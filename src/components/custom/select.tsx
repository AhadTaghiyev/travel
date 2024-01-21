import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { isNil } from "lodash";
import { InputLabel, FormHelperText } from "@mui/material";

import { apiService } from "@/server/apiServer";
import { useModal } from "@/hooks/useModal";

import { textStyling } from "../../styles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ICustomAutocompleteModel {
  value: string | number | boolean;
  change: (value: string) => void;
  api?: string;
  label: string;
  refetech?: boolean;
  optionLabel: string;
  staticOptions?: { value: string | boolean; label: string }[];
  errorMessages: string[];
  hasErrorMessages: boolean;
}

export default function CustomAutocomplete({
  api,
  label,
  value,
  change,
  refetech,
  optionLabel,
  errorMessages,
  staticOptions,
  hasErrorMessages,
}: ICustomAutocompleteModel) {
  const [options, setOptions] = useState(staticOptions ?? null);
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
      <Select onValueChange={change} defaultValue={String(value)}>
        <SelectTrigger>
          <SelectValue placeholder={t("Select option")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            value={null}
            disabled={true}
            className="hidden last:block"
          >
            {isNil(options) ? t("Loading...") : t("No item found")}
          </SelectItem>
          {options?.map((option) => (
            <SelectItem value={String(option.value)} key={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
