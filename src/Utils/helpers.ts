import { MarkerItem } from "Types/MarkerItem";

export const getMarkerItemKey = ({
  latitude,
  longitude,
}: Omit<MarkerItem, "title" | "description">) => latitude + longitude;
