import CodeIcon from "@mui/icons-material/Code";
import DashboardIcon from "@mui/icons-material/Dashboard";
import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

export interface Application {
  name: string;
  comp: React.FC;
}

interface Props {
  components: Application[];
}

function ApplicationToggle({ components }: Props) {
  const [ActiveService, setActiveService] = useState<React.FC>(() => components[0]?.comp ?? <div />);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleServiceChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, selectedService: Application) => {
    if (selectedService?.comp) setActiveService(() => selectedService?.comp);
    setDrawerOpen(false);
  };

  return (
    <div>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ minWidth: "200px" }}>
          <ListItem onClick={() => setDrawerOpen(false)}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Services" />
          </ListItem>
          {components.map(({ name }, i) => (
            <ListItem key={name + "_" + i} onClick={(event: any) => handleServiceChange(event, components.find((v) => v.name === name)!)}>
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <ActiveService />

      <div onClick={() => { setDrawerOpen(true) }}
        style={{ top: 0, position: "absolute", margin: "5px", padding: "10px", background: "#dedede", borderRadius: "10px" }}>
        <DashboardIcon />
      </div>
    </div>
  );
}

export default ApplicationToggle;
