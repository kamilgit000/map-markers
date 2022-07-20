import { Controller, ControllerProps } from "react-hook-form";
import { TextField } from "@mui/material";
import { MarkerItem } from "Types/MarkerItem";

interface Props extends Omit<ControllerProps<MarkerItem>, "render"> {
  label: string;
  error?: boolean;
  errorMessage?: string;
  pattern?: RegExp;
  required?: boolean;
}

export default function Input({
  control,
  defaultValue,
  name,
  error,
  errorMessage,
  label,
  pattern,
  required,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required,
        pattern,
      }}
      render={(renderProps) => (
        <TextField
          error={error}
          label={label}
          helperText={error && errorMessage}
          {...renderProps.field}
        />
      )}
    />
  );
}
