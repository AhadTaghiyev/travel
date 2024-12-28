import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FormHelperText, InputLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import { cn } from "@/lib/utils";
import ReactDOM from "react-dom";
import Select, {
  CSSObjectWithLabel,
  GroupBase,
  OptionProps,
} from "react-select";

import { apiService } from "@/server/apiServer";
import { textStyling } from "@/styles";
import { useTranslation } from "react-i18next";

type SelectOption = {
  label: string;
  value: string;
  debt?: number;
};

interface IProps {
  filterOption?: any;
  size?: "md" | "lg";
  value: SelectOption[];
  getOptions?: (options: any[]) => void;
  change: (option: SelectOption[], debts?: number[]) => void;
  closeMenuOnSelect?: boolean;
  api?: string;
  label: string;
  refetech?: boolean;
  optionLabel: string;
  secondaryOptionLabel?: string;
  disabled?: boolean;
  errorMessages: string[];
  hasErrorMessages: boolean;
  isMultiSelect?: boolean;
  dependencies?: any[];
  filterFunction?: (item: any) => boolean;
}

const CustomMultiSelect: React.FC<IProps> = ({
  api,
  value,
  label,
  change,
  refetech,
  size = "md",
  getOptions,
  optionLabel,
  filterOption,
  errorMessages,
  hasErrorMessages,
  secondaryOptionLabel,
  isMultiSelect = true,
  closeMenuOnSelect = false,
  dependencies = [],
  filterFunction
}) => {
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement>();
  const [popperElement, setPopperElement] = useState<any>();
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
  });

  const fetchData = async () => {
    if (!api) return; // Prevent unnecessary fetch if API is missing
    setLoading(true);
    try {
      const res = await apiService.get(api);
      console.log("res", res);
      let filteredRes = res.data.items;
      if (filterFunction) {
        filteredRes = filteredRes.filter(filterFunction);
        console.log("filteredRes", filteredRes);
      }
      getOptions?.(filteredRes);

      const data = filteredRes
        .map((x) => ({
          label: secondaryOptionLabel
            ? `${x[optionLabel]} ~ ${x[secondaryOptionLabel] ?? 0}`
            : x[optionLabel],
          value: x.id,
          debt: x[secondaryOptionLabel] ?? 0,
        }))
        .filter((item) => item.label && item.value);
      console.log("data", data);

      setOptions(data);
    } catch (error) {
      console.error("Error fetching data in CustomMultiSelect:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  useEffect(() => {
    if (refetech) {
      setOptions([]);
      fetchData();
      referenceElement.click();
    }
  }, [refetech]);

  return (
    <Popover className="w-full">
      {(isOpen) => (
        <>
          <InputLabel sx={{ mb: 1 }} style={textStyling}>
            {label}
          </InputLabel>
          <Popover.Button
            ref={setReferenceElement}
            className="border-none outline-none w-full"
          >
            <div
              className={cn(
                "relative h-[41px] pl-2 pr-1 flex items-center text-sm text-dark-gray_main rounded-lg bg-white border border-[#E5E5E5] border-solid",
                size === "md" ? "w--[150px] w-full" : "w--[210px] w-full"
              )}
            >
              <>
                {value.length > 0 ? (
                  <div className="flex items-center">
                    <p className="ml-0.5 text-lighter-gray px-0.5 truncate text-left rounded-sm w-full">
                      {options.find((o) => o.value === value[0]?.value)
                        ?.label ?? ""}
                    </p>
                  </div>
                ) : (
                  <p className="ml-0.5 text-lighter-gray px-0.5 truncate text-left rounded-sm w-full">
                    {t("Select option")}
                  </p>
                )}
              </>
              <div className="ml-auto flex gap-0.5 items-center">
                {value.length > 1 && (
                  <p className="ml-auto text-[rgba(0,0,0,0.7)] text-xs truncate px-0.5 rounded-sm">
                    +{value.length - 1}
                  </p>
                )}
                <KeyboardArrowDownIcon
                  style={{
                    transition: "0.4s",
                    transform: isOpen.open ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </div>
            </div>
          </Popover.Button>
          {ReactDOM.createPortal(
            <Popover.Panel
              ref={setPopperElement}
              style={{
                ...styles.popper,
                width: `${referenceElement?.clientWidth}px`,
              }}
              {...attributes.popper}
              className={`z-[80] bg-red-300 `}
            >
              <Select
                isMulti={isMultiSelect}
                isSearchable
                placeholder={t("Search option...")}
                isLoading={loading}
                options={options.filter((o) => o.value)}
                onChange={(newValue) => {
                  if (isMultiSelect) {
                    const selectedDebts = (newValue as SelectOption[]).map(
                      (item) => options.find((o) => o.value === item.value)?.debt || 0
                    );
                    change(newValue as SelectOption[], selectedDebts);
                  } else {
                    change(newValue as SelectOption[]);
                  }
                  if (closeMenuOnSelect) referenceElement.click();
                }}
                isClearable={true}
                filterOption={filterOption}
                value={value}
                menuIsOpen={true}
                styles={getSelectStyles()}
                closeMenuOnSelect={false}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
                className={cn("w-full")}
                classNamePrefix="select"
              />
            </Popover.Panel>,
            document.body
          )}
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
      )}
    </Popover>
  );
};

const getSelectStyles = () => ({
  control: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    borderRadius: 0,
    fontSize: "14px",
    width: "100%",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    backgroundColor: "white",
    border: "none",
  }),
  multiValue: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
  }),
  option: (
    baseStyles: CSSObjectWithLabel,
    state: OptionProps<any, true, GroupBase<any>>
  ) => ({
    ...baseStyles,
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: state.isSelected ? "#8D8D8D" : "inherit",
    "&:hover": {
      backgroundColor: state.isSelected ? "#8D8D8D" : "#F4F4F4",
    },
  }),
  menuPortal: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    width: "100%",
  }),
  menu: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    marginTop: 0,
    borderRadius: 0,
    border: "none",
    borderTop: "none",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    width: "100%",
  }),
});

export default CustomMultiSelect;
