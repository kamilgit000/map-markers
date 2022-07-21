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
  const { setLongitude, setLatitude } = useMapCoordinates();

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
            if (name === "longitude") {
              setLongitude(Number(args.target.value));
            } else if (name === "latitude") {
              setLatitude(Number(args.target.value));
            }
            field.onChange(args);
          }}
        />
      )}
    />
  );
}
