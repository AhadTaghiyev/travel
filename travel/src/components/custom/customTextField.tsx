import { InputLabel, TextField, FormHelperText } from '@mui/material';
import { textStyling } from '../../styles';

interface ICustomTextFieldModel {
  label: string;
  value: any,
  change: any,
  hasErrorMessages?: boolean,
  errorMessages?: string[],
  name: string,
  type?: string,
  placeholder?: string
}

export default function CustomTextField({ label, name, change, hasErrorMessages, errorMessages, value, type='text', placeholder }: ICustomTextFieldModel) {
  return (
    <>
      <InputLabel
        id="demo-simple-select-label"
        sx={{ mb: 1 }}
        style={textStyling}
      >
        {label}
      </InputLabel>
      <TextField
        id="outlined-basic"
        variant="outlined"
        sx={{ width: '100%', mb: 1 }}
        style={textStyling}
        name={name}
        value={value}
        onChange={change}
        type={type}
        size="small"
        placeholder={placeholder}
      />
      {hasErrorMessages && (
          <>
            {
                errorMessages?.map((item, key)=> (
                    <FormHelperText key={key} sx={{ color: 'red' }}>
                        {item}
                     </FormHelperText>
                ))
            }
          </>
        )}
    </>
  );
}
