
import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useField } from 'formik';

type FormikTextFieldProps = TextFieldProps & {
    name: string
}

/**
 * Custom TextField component integrated with formik, name property is mandatory
 */
const FormikTextField: React.FC<FormikTextFieldProps> = ({ name, ...props }) => {

    const [field, meta] = useField(name);

    return (
        <TextField
            {...field}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            {...props}
        />
    );
}

export default FormikTextField;