import { ReactNode } from "react";
import DialogProvider from "./useDialog";

interface Props {
  children: ReactNode;
}
export default function Providers({ children }: Props) {
  return <DialogProvider>{children}</DialogProvider>;
}
