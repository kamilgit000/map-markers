import { Container } from "./styles";
import { Link } from "react-router-dom";
import AppRoutes from "Types/AppRoutes";
import { Box, Tab, Tabs } from "@mui/material";
import usePathname from "Hooks/usePathname";

export default function Header() {
  const path = usePathname();

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={path}>
          <Tab
            value={AppRoutes.List}
            component={Link}
            to={AppRoutes.List}
            label="Markers List"
          />
          <Tab
            value={AppRoutes.Form}
            component={Link}
            to={AppRoutes.Form}
            label="Marker form"
          />
        </Tabs>
      </Box>
    </Container>
  );
}
