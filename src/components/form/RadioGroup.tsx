import { FormGroup, FormLabel, FormCheck, type FormControlProps } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import { Controller, type FieldPath, type FieldValues } from 'react-hook-form';

import type { FormInputProps } from '@/types/component';

type RadioGroupFormInputProps = {
  options: string[]; // Array of radio button options
  inline?: boolean; // Display radio buttons inline
};

const RadioGroupFormInput = <
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
}: FormInputProps<TFieldValues> & FormControlProps & RadioGroupFormInputProps) => {
  return (
    <Controller<TFieldValues, TName>
      name={name as TName}
      defaultValue={''} // Default as an empty string for radio group
      control={control}
      render={({ field, fieldState }) => (
        <FormGroup className={containerClassName ?? ''}>
          {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
          {options.map((option) => (
            <FormCheck
              key={option}
              type="radio"
              label={option}
              value={option}
              id={`${name}-${option}`}
              inline={inline}
              checked={field.value === option} // Bind checked state
              onChange={(e) => {
                field.onChange(e.target.value); // Update form state with selected value
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

export default RadioGroupFormInput;
