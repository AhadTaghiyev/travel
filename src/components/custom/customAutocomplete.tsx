import {
  Autocomplete,
  InputLabel,
  FormHelperText,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { textStyling } from "../../styles";
import { apiService } from "../../server/apiServer";
import { useTranslation } from "react-i18next";

interface ICustomAutocompleteModel {
  label: string;
  initialValue: any;
  change: any;
  api: string;
  hasErrorMessages: boolean;
  errorMessages: string[];
  optionLabel: string;
}

export default function CustomAutocomplete({
  label,
  initialValue = null,
  change,
  api,
  hasErrorMessages,
  errorMessages,
  optionLabel,
}: ICustomAutocompleteModel) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await apiService.get(api);

    setData(
      res.data.items.map((x) => ({ label: x[optionLabel], value: x.id }))
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <InputLabel
        id="demo-simple-select-label"
        sx={{ mb: 1 }}
        style={textStyling}
      >
        {label}
      </InputLabel>
      <Autocomplete
        loading
        disablePortal
        key={
          initialValue ? `${data?.find((x) => x.value === initialValue)}` : ""
        }
        id="combo-box-demo"
        loadingText={t("Loading...")}
        value={initialValue && data?.find((x) => x.value === initialValue)}
        onChange={change}
        options={data}
        style={textStyling}
        sx={{ width: "100%" }}
        size="small"
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
