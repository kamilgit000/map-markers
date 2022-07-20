import { Routes as Switch, Route, Navigate } from "react-router-dom";
import MarkerForm from "Screens/MarkerForm";
import MarkerList from "Screens/MarkerList";
import AppRoutes from "Types/AppRoutes";

export default function Routing() {
  return (
    <Switch>
      <Route path={`/${AppRoutes.List}`} element={<MarkerList />} />
      <Route path={`/${AppRoutes.Form}`} element={<MarkerForm />} />
      <Route
        path={"*"}
        element={<Navigate to={`/${AppRoutes.List}`} replace />}
      />
    </Switch>
  );
}
