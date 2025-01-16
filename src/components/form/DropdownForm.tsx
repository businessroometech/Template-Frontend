import {
  FormGroup,
  FormLabel,
  FormSelect,
  type FormControlProps,
} from "react-bootstrap";
import Feedback from "react-bootstrap/esm/Feedback";
import { Controller, type FieldPath, type FieldValues } from "react-hook-form";

import type { FormInputProps } from "@/types/component";

type DropdownFormInputProps = {
  options: { value: string; label: string }[]; // Dropdown options with value and label
};

const DropdownFormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  options,
  containerClassName,
  control,
  labelClassName,
  label,
  noValidate,
  ...other
}: FormInputProps<TFieldValues> & FormControlProps & DropdownFormInputProps) => {
  return (
    <Controller<TFieldValues, TName>
      name={name as TName}
      defaultValue={""} // Default as an empty string for dropdown
      control={control}
      render={({ field, fieldState }) => (
        <FormGroup className={containerClassName ?? ""}>
          {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
          <FormSelect
            {...field}
            {...other}
            isInvalid={!noValidate && !!fieldState.error}
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FormSelect>
          {!noValidate && fieldState.error?.message && (
            <Feedback type="invalid">{fieldState.error?.message}</Feedback>
          )}
        </FormGroup>
      )}
    />
  );
};

export default DropdownFormInput;
