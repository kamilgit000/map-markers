import { Controller, ControllerProps } from "react-hook-form";
import { TextField } from "@mui/material";
import { MarkerItem } from "Types/MarkerItem";
import { useMapCoordinates } from "Providers/useMapCoordinates";

interface Props
  extends Omit<ControllerProps<Omit<MarkerItem, "id">>, "render"> {
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
  const { setEditingMarker } = useMapCoordinates();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required,
        pattern,
      }}
      render={({ field }) => (
        <TextField
          error={error}
          label={label}
          helperText={error && errorMessage}
          {...field}
          onChange={(args) => {
            setEditingMarker((item) => {
              if (item) {
                return {
                  ...item,
                  [name]: args.target.value,
                };
              }
              return {
                [name]: args.target.value,
              };
            });
            field.onChange(args);
          }}
        />
      )}
    />
  );
}
