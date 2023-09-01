import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AirplayRoundedIcon from "@mui/icons-material/AirplayRounded";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Button,
  CardActionArea,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Toolbar,
} from "@mui/material";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import RuleIcon from "@mui/icons-material/Rule";
import Slide from "@mui/material/Slide";
import { Fade } from "react-reveal";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function InspectorListCardRequests({ data }) {
  const initialCardStates = data.chemicals.map(() => ({
    concentration: "",
    remarks: "",
  }));

  const [cardStates, setCardStates] = useState(initialCardStates);
  const [expanded, setExpanded] = useState(false);
  const [availability, setAvailability] = useState(
    new Array(data.chemicals.length).fill(null)
  );
  const [cardSaveClicks, setCardSaveClicks] = useState(
    new Array(data.chemicals.length).fill(false)
  );
  const [cardDisabled, setCardDisabled] = useState(new Array(data.chemicals.length).fill(false));


  const [value, setValue] = React.useState();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [selectedInspector, setSelectedInspector] = useState(null);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleOpenDialog = () => {
    setSelectedTransporter(null); // Reset selected transporter
    setSelectedInspector(null);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSendPackage = () => {
    handleCloseDialog();
  };
  const handleSaveClick = (cardIndex) => {
    const updatedCardSaveClicks = [...cardSaveClicks];
    updatedCardSaveClicks[cardIndex] = true;
    setCardSaveClicks(updatedCardSaveClicks);
    const updatedCardDisabled = [...cardDisabled];
    updatedCardDisabled[cardIndex] = true;
    setCardDisabled(updatedCardDisabled);
  };


  const allCardsSaved = cardSaveClicks.every((click) => click);

  return (
    <Fade bottom>
    <Card sx={{ maxWidth: 363, borderRadius: "24px", borderColor: "white" }}>
      <CardHeader title={data.name} subheader={data.manufacturer_id} />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Manufacturer"
      />
     
      {!data["send-package"] && (
        <CardActions>
          <Stack spacing={0.2}>
            <Grid item xs={12} sm={6}>
              <Button
                color="success"
                fullWidth
                variant="contained"
                endIcon={<AirplayRoundedIcon />}
                onClick={() => handleOpenDialog("inspector")}
                sx={{
                  borderRadius: "50px",
                  width: "345px",
                  marginBottom: "10px",
                }}
              >
                Do Inspection
              </Button>
            </Grid>
          </Stack>
        </CardActions>
      )}
      <Dialog
        TransitionComponent={Transition}
        fullScreen
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Package Details
            </Typography>
            <Button
              color="success"
              variant="outlined"
              endIcon={<RuleIcon />}
              disabled={!allCardsSaved}
              onClick={handleCloseDialog}
              sx={{ borderRadius: "50px" }}
            >
              Inspect Package
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <div>
            <Typography variant="body2" color="text.secondary">
              <div className="card-container" style={{ marginTop: "8px" }}>
                {data.chemicals.map((chemical, index) => (
                  <Card sx={{ maxWidth: 700, marginBottom: "16px" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={chemical.image}
                        alt={chemical.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {chemical.name} ({chemical.quantity} Kg)
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          {chemical.description}
                        </Typography>
                        <Divider
                          sx={{ marginBottom: "16px", marginTop: "8px" }}
                        />
                        <Stack
                          direction="row"
                          spacing={4}
                          sx={{ justifyContent: "flex-start" }}
                        >
                          <TextField
                            required
                            id={`concentration-${index}`} // Use a unique identifier for each concentration field
                            label="Concentration"
                            value={cardStates[index].concentration}
                            onChange={(e) => {
                              const updatedCardStates = [...cardStates];
                              updatedCardStates[index].concentration =
                                e.target.value;
                              setCardStates(updatedCardStates);
                            }}
                            variant="outlined"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            disabled={cardDisabled[index]}
                            color="success"
                          />
                          <TextField
                            id={`remarks-${index}`} // Use a unique identifier for each remarks field
                            label="Remarks"
                            multiline
                            variant="filled"
                            sx={{ width: "500px" }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={cardStates[index].remarks}
                            onChange={(e) => {
                              const updatedCardStates = [...cardStates];
                              updatedCardStates[index].remarks = e.target.value;
                              setCardStates(updatedCardStates);
                            }}
                            disabled={cardDisabled[index]}
                            color="success"
                          />
                        </Stack>
                        <Stack
                          direction="row"
                          sx={{ justifyContent: "flex-end" }}
                        >
                          <Button
                            onClick={() => handleSaveClick(index)}
                            variant="filled"
                            sx={{
                              borderRadius: "50px",
                              marginTop: "48px",
                            }}
                            disabled={cardDisabled[index]}
                            color="green"
                          >
                            SAVE
                          </Button>
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </div>
            </Typography>
            <Divider />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
    </Fade>
  );
}
