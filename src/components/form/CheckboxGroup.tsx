import { FormGroup, FormLabel, FormCheck, type FormControlProps } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import { Controller, type FieldPath, type FieldValues, type PathValue } from 'react-hook-form';

import type { FormInputProps } from '@/types/component';

type CheckboxGroupFormInputProps = {
  options: string[]; // Array of checkbox options
  inline?: boolean; // Display checkboxes inline
};

const CheckboxGroupFormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  options,
  inline = false,
  containerClassName,
  control,
  labelClassName,
  label,
  noValidate,
  ...other
}: FormInputProps<TFieldValues> & FormControlProps & CheckboxGroupFormInputProps) => {
  return (
    <Controller<TFieldValues, TName>
      name={name as TName}
      defaultValue={[]} // Default as an empty array for checkbox group
      control={control}
      render={({ field, fieldState }) => (
        <FormGroup className={containerClassName ?? ''}>
          {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
          {options.map((option) => (
            <FormCheck
              key={option}
              type="checkbox"
              label={option}
              value={option}
              id={`${name}-${option}`}
              inline={inline}
              checked={field.value.includes(option)} // Bind checked state
              onChange={(e) => {
                const checked = e.target.checked;
                const value = e.target.value;
                const newValue = checked
                  ? [...field.value, value]
                  : field.value.filter((v: string) => v !== value);
                field.onChange(newValue); // Update form state
              }}
              {...other}
            />
          ))}
          {!noValidate && fieldState.error?.message && (
            <Feedback type="invalid">{fieldState.error?.message}</Feedback>
          )}
        </FormGroup>
      )}
    />
  );
};

export default CheckboxGroupFormInput;
