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
            label="Pin List"
          />
          <Tab
            value={AppRoutes.Add}
            component={Link}
            to={AppRoutes.Add}
            label="Add pin"
          />
        </Tabs>
      </Box>
    </Container>
  );
}
