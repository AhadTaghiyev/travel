import { Grid } from "@mui/material";
import { ISimpleTable } from "./types";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const tableWrapper = {
  border: "1px solid #EBEDF0",
};

const headerStyle = {
  color: "#000",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "24px",
  paddingLeft: "16px",
  paddingTop: "11px",
  paddingBottom: "11px",
};

export default function index({
  header,
  properties,
  values,
  details,
}: ISimpleTable) {
  console.log(properties);
  console.log(values);

  return (
    <div style={tableWrapper}>
      <h3 style={headerStyle}>{header}</h3>
      {properties.map((item, index) => (
        <Grid key={index} container sx={{ borderTop: "1px solid #EBEDF0" }}>
          <Grid
            item
            xs={4}
            sx={{ borderRight: "1px solid #EBEDF0", pl: 2, py: 2 }}
          >
            <p>{item?.fieldName}</p>
          </Grid>
          <Grid
            item
            xs={details ? 6 : 8}
            sx={{
              borderRight: details && "1px solid #EBEDF0",
              paddingLeft: 2,
              py: 2,
            }}
          >
            <p>{values && values[item?.propertyName]}</p>
          </Grid>
          {details && (
            <Grid item xs={2} sx={{ paddingLeft: 2, py: 2 }}>
              <Link to={details[item?.propertyName]}>
                <FaEye />
              </Link>
            </Grid>
          )}
        </Grid>
      ))}
      <footer></footer>
    </div>
  );
}
