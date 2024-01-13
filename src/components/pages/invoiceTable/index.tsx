// @ts-nocheck
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Grid,
  Button,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { FiDownload } from 'react-icons/fi';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const headerStyle = {
  borderColor: '#c4c4c4',
  padding: '0px 10px',
  width: '100%',
  height: '35px',
  fontFamily: 'Font Awesome 6 Pro',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '16px',
};

function getNestedProperty(obj: any, path: string): any {
  const keys = path.split('.');
  let current: any = obj;

  for (const key of keys) {
    if (current[key] === undefined) {
      return undefined;
    } else {
      current = current[key];
    }
  }
  return current;
}
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function Index({ headers, tickets, totals }: any) {
  const [emptyCells, setEmptyCells] = useState<any>([]);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, 'day'));

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem('token'); // Replace "your_token_key" with the actual key you used to store the token
      if (!token) {
        console.error('Token is not found');
        return;
      }

      const config = {
        responseType: 'blob', // Binary data as the response
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // const response = await axios.get(`https://localhost:7275/api/${exportLink}`, config);

      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', `${buttonText}.xlsx`);
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    } catch (error) {
      console.error('An error occurred while downloading the data: ', error);
    }
  };

  useEffect(() => {
    const emptCells = [];

    for (let i = 0; i < Math.ceil((headers.length - 2) / 2) + 1; i++) {
      emptCells.push(
        <TableCell
          sx={{ borderLeft: '1px solid #e0e0e0', backgroundColor: '#F8F9FA' }}
        />
      );
    }

    setEmptyCells(emptCells);
  }, [headers]);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item style={{ paddingLeft: 0 }}>
        <Button
          onClick={handleDownload}
          variant="outlined"
          sx={headerStyle}
          color="inherit"
        >
          <FiDownload style={{ marginRight: '6px' }} />
          Export
        </Button>
      </Grid>
      <Grid item md={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker']}>
            <DatePicker
              slotProps={{
                textField: {
                  size: 'small',
                  InputProps: { sx: { fontSize: '12px' } },
                },
              }}
              sx={{ width: '100%', mb: 1 }}
              label=""
              onChange={(newValue) => {
                const event = {
                  target: {
                    value: newValue,
                  },
                };
                handleStartDateChange(event.target.value);
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Grid>

      <Grid item md={3} sx={{mb: 2}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker']}>
            <DatePicker
              slotProps={{
                textField: {
                  size: 'small',
                  InputProps: { sx: { fontSize: '12px' } },
                },
              }}
              sx={{ width: '100%', mb: 1 }}
              label=""
              onChange={(newValue) => {
                const event = {
                  target: {
                    value: newValue,
                  },
                };
                handleEndDateChange(event.target.value);
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell
                size="medium"
                align="left"
                sx={{ fontWeight: 'bold', borderLeft: '1px solid #e0e0e0' }}
              >
                No
              </TableCell>
              {headers.map((elem, index) => (
                <TableCell
                  size="medium"
                  align="left"
                  sx={{ fontWeight: 'bold', borderLeft: '1px solid #e0e0e0' }}
                  key={index}
                >
                  {elem.fieldName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((elem, index) => (
              <TableRow key={index}>
                <TableCell
                  size="medium"
                  sx={{ borderLeft: '1px solid #e0e0e0' }}
                  align="left"
                  key={index}
                >
                  {index + 1}
                </TableCell>

                {headers.map((hElem, hKey) => (
                  <TableCell
                    size="medium"
                    sx={{ borderLeft: '1px solid #e0e0e0' }}
                    align="left"
                    key={hKey}
                  >
                    {hElem.propertyName === 'date'
                      ? formatDate(getNestedProperty(elem, hElem.propertyName))
                      : getNestedProperty(elem, hElem.propertyName)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow
              sx={{
                width: '100%',
                borderBottom: '1px solid #e0e0e0',
                backgroundColor: '#F8F9FA',
              }}
            >
              <TableCell
                sx={{
                  borderLeft: '1px solid #e0e0e0',
                  backgroundColor: '#F8F9FA',
                }}
              />
              {headers.map((hElem, hKey) => (
                <TableCell
                  key={hKey}
                  sx={{
                    borderLeft: '1px solid #e0e0e0',
                    backgroundColor: '#F8F9FA',
                    fontWeight: 'bold',
                  }}
                >
                  {hElem.propertyName === 'credit'
                    ? totals.credit
                    : hElem.propertyName === 'debit'
                    ? totals.debit
                    : hElem.propertyName === 'detail'
                    ? `Ümumi : ${totals.total}`
                    : null}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
