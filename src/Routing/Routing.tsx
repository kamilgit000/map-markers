import { Routes as Switch, Route, Navigate } from "react-router-dom";
import AddForm from "Screens/AddForm";
import PinList from "Screens/PinList";
import AppRoutes from "Types/AppRoutes";

export default function Routing() {
  return (
    <Switch>
      <Route path={`/${AppRoutes.List}`} element={<PinList />} />
      <Route path={`/${AppRoutes.Add}`} element={<AddForm />} />
      <Route path={`/${AppRoutes.Edit}`} element={<PinList />} />
      <Route
        path={"*"}
        element={<Navigate to={`/${AppRoutes.List}`} replace />}
      />
    </Switch>
  );
}
