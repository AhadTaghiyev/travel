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
    if (initialValue !== null) fetchData();
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
        disablePortal
        loading
        id="combo-box-demo"
        loadingText={t("Loading...")}
        defaultValue={initialValue}
        onChange={change}
        onOpen={fetchData}
        options={data}
        style={textStyling}
        sx={{ width: "100%" }}
        size="small"
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
