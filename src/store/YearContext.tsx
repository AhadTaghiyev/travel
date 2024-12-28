import { createContext, useEffect, useState } from "react";
import dayjs from "dayjs";

export const YearContext = createContext<{
    selectedYear: string | number;
    setSelectedYear: (year: string | number) => void;
}>({
    selectedYear: dayjs().year(),
    setSelectedYear: () => { },
});

export const YearProvider = ({ children }: any) => {
    const [selectedYear, setSelectedYear] = useState(() => {
        const yearFromStorage = localStorage.getItem("selectedYear");
        console.log("yearFromStorage", yearFromStorage)
        return yearFromStorage === "All"
            ? yearFromStorage === "All"
                ? "All"
                : parseInt(yearFromStorage || "", 10)
            : dayjs().year();
    });

    useEffect(() => {
        localStorage.setItem("selectedYear", selectedYear.toString());
    }, [selectedYear]);

    return (
        <YearContext.Provider value={{ selectedYear, setSelectedYear }}>
            {children}
        </YearContext.Provider>
    );
};
