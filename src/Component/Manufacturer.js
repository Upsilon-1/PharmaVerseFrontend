import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Inventory from '../Component/Inventory';
import { Tab, Tabs } from '@mui/material';
import ChemicalListChart from '../Miscellaneous/ChemicalLineChart';
import ChemicalList from '../Miscellaneous/ChemicalList';
import TopChemicals from '../Miscellaneous/TopChemicals';
import AddMaterial from '../Miscellaneous/AddMaterial'
import Logo from '../Images/logoPharma.png'
import MedicineList from '../Miscellaneous/MedicineList';
import CreateNewBatch from '../Miscellaneous/CreateNewBatch';
import OngoingBatches from '../Miscellaneous/OngoingBatches';
import CompletedBatches from '../Miscellaneous/CompletedBatches';
import CreateMed from '../Miscellaneous/CreateMed';
import batchData from '../medicine.json'
import SendRequestToSupplier from '../Miscellaneous/SendRequestToSupplier';
const drawerWidth = 240;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <img src={Logo} alt="Logo" width={"200rem"} height={"50rem"}
        style={{ marginTop: "1rem", marginBottom: "1rem" }} />
      <Divider />
      <List>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="List of Medicines" {...a11yProps(0)} />
          <Tab label="Create New Batch" {...a11yProps(1)} />
          <Tab label="Ongoing Batches" {...a11yProps(2)} />
          <Tab label="Completed Batches" {...a11yProps(3)} />
          <Tab label="Create Medicine" {...a11yProps(4)} />
          <Tab label="Send Request to Supplier" {...a11yProps(5)} />
        </Tabs>
      </List>
      <Divider />

    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography paragraph>
          <TabPanel value={value} index={0}>
            <MedicineList />

          </TabPanel>
          <TabPanel value={value} index={1}>
            <CreateNewBatch jsonData={batchData} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <OngoingBatches />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <CompletedBatches />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <CreateMed />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <SendRequestToSupplier jsonData={batchData} />
          </TabPanel>
          <TabPanel value={value} index={6}>
            6th
          </TabPanel>
        </Typography>

      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
