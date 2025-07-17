import { forwardRef } from 'react';
import type { ReactElement } from 'react';

import { CircularProgress, TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import { Controller} from 'react-hook-form';
import type { UseFormReturn, Path, FieldValues, ControllerRenderProps, ControllerFieldState } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

interface CustomTextFieldProps<T extends FieldValues> {
  disabled?: boolean;
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: ControllerFieldState;
  label: string;
  loading?: boolean;
  textFieldProps?: TextFieldProps;
}

function CustomTextField<T extends FieldValues>(props: CustomTextFieldProps<T>): ReactElement {
  const { disabled, field, fieldState, label, loading = false, textFieldProps } = props;

  const inputProps = {
    ...textFieldProps?.slotProps?.input,
    endAdornment: loading ? (
        <CircularProgress color="inherit" size={20} />
    ) : null,
    disabled: disabled || textFieldProps?.disabled,
  };

  const labelProps = {
    ...textFieldProps?.slotProps?.inputLabel,
    shrink: true,
  };

  return (
    <TextField
      {...field}
      {...textFieldProps}
      slotProps={{
        input: inputProps,
        inputLabel: labelProps,
      }}
      label={label}
      fullWidth
      error={!!fieldState.error}
      helperText={fieldState.error ? fieldState.error.message : ''}
      disabled={loading || textFieldProps?.disabled}
    />
  );
}

interface FormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  loading?: boolean;
  disabled?: boolean;
  textFieldProps?: Omit<TextFieldProps, 'name' | 'label' | 'error' | 'helperText'>;
}

function FormField<T extends FieldValues>(props: FormFieldProps<T>): ReactElement {
  return (
    <Controller
      name={props.name}
      control={props.form.control}
      render={(controllerProps) => {
        return (
          <CustomTextField
            disabled={props.disabled}
            field={controllerProps.field}
            fieldState={controllerProps.fieldState}
            label={props.label}
            loading={props.loading}
            textFieldProps={props.textFieldProps}
          />
        );
      }}
    />
  );
}

interface CustoMaskProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const CPFMask = forwardRef<HTMLInputElement, CustoMaskProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000.000.000-00"
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

function CPFFormField<T extends FieldValues>(props: FormFieldProps<T>): ReactElement {
  return (
    <Controller
      name={props.name}
      control={props.form.control}
      render={({ field, fieldState }) => (
        <CustomTextField
          field={field}
          fieldState={fieldState}
          label={props.label}
          loading={props.loading}
          textFieldProps={{
            ...props.textFieldProps,
            slotProps: {
              input: {
                inputComponent: CPFMask as never,
              },
            },
          }}
        />
      )}
    />
  );
}

const CEPMask = forwardRef<HTMLInputElement, CustoMaskProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00000-000"
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

function CEPFormField<T extends FieldValues>(props: FormFieldProps<T>): ReactElement {
  return (
    <Controller
      name={props.name}
      control={props.form.control}
      render={({ field, fieldState }) => (
        <CustomTextField
          field={field}
          fieldState={fieldState}
          label={props.label}
          loading={props.loading}
          textFieldProps={{
            ...props.textFieldProps,
            slotProps: {
              input: {
                inputComponent: CEPMask as never,
              },
              inputLabel: {
                shrink: true, // Ensures the label is always visible
              }
            },
          }}
        />
      )}
    />
  );
}

const PhoneMask = forwardRef<HTMLInputElement, CustoMaskProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(00) 00000-0000"
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

function PhoneFormField<T extends FieldValues>(props: FormFieldProps<T>): ReactElement {
  return (
    <Controller
      name={props.name}
      control={props.form.control}
      render={({ field, fieldState }) => (
        <CustomTextField
          field={field}
          fieldState={fieldState}
          label={props.label}
          loading={props.loading}
          textFieldProps={{
            ...props.textFieldProps,
            slotProps: {
              input: {
                inputComponent: PhoneMask as never,
              }
            }
          }}
        />
      )}
    />
  );
}

export {
  CEPFormField,
  CPFFormField,
  FormField,
  PhoneFormField
}
