import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { isNil } from "lodash";
import {
  Autocomplete,
  InputLabel,
  FormHelperText,
  TextField,
} from "@mui/material";

import { apiService } from "@/server/apiServer";
import { useModal } from "@/hooks/useModal";

import { textStyling } from "../../styles";

interface ICustomAutocompleteModel {
  change: any;
  api?: string;
  label: string;
  initialValue: any;
  refetech?: boolean;
  optionLabel: string;
  staticOptions?: any[];
  errorMessages: string[];
  hasErrorMessages: boolean;
}

export default function CustomAutocomplete({
  api,
  label,
  change,
  refetech,
  optionLabel,
  errorMessages,
  staticOptions,
  hasErrorMessages,
  initialValue = null,
}: ICustomAutocompleteModel) {
  const [options, setOptions] = useState(staticOptions ?? []);
  const { onClose } = useModal();
  const { t } = useTranslation();

  const fetchData = async () => {
    const res = await apiService.get(api);

    const data = res.data.items.map((x) => ({
      label: x[optionLabel],
      value: x.id,
    }));

    setOptions(
      data.length === 0
        ? [
            {
              label: t("No item found"),
              disabled: true,
            },
          ]
        : data
    );
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
      <Autocomplete
        loading
        disablePortal
        key={
          initialValue
            ? `${options?.find((x) => x.value === initialValue)}`
            : ""
        }
        loadingText={t("Loading...")}
        value={
          isNil(initialValue)
            ? null
            : options?.find((x) => x.value === initialValue)
        }
        onChange={change}
        options={options}
        style={textStyling}
        sx={{ width: "100%" }}
        size="small"
        getOptionDisabled={(option) => option.disabled}
        isOptionEqualToValue={(option, value) => option.value === value}
        renderInput={(params) => <TextField {...params} label="" />}
      />
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
