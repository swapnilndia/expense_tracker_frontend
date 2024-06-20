import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PaidIcon from "@mui/icons-material/Paid";
import MoneyOffCsredIcon from "@mui/icons-material/MoneyOffCsred";
import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserService } from "../redux/services/userServices";
import { useSelector } from "react-redux";
import { selectDetailedUser } from "../redux/reducers/userReducer";

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useSelector(selectDetailedUser);
  const handleVerify = async (email: string) => {
    const response = await UserService.verifyEmailInitialize({ email });
    if (response?.status === 200) {
      navigate("/sent-mail-verify");
    }
  };
  return (
    <Paper
      sx={{ minWidth: "600px", width: "75%", margin: "20px auto 20px auto" }}
    >
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <TableContainer sx={{ width: "100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell component="h3">
                    <Typography variant="body1">Title</Typography>{" "}
                  </TableCell>
                  <TableCell align="right" colSpan={3}>
                    <Typography variant="body1">Title</Typography> Description
                  </TableCell>
                </TableRow>
              </TableHead>
              {user && (
                <TableBody>
                  <TableRow hover role="checkbox">
                    <TableCell align="left">
                      <Typography variant="body1">Name</Typography>{" "}
                    </TableCell>
                    <TableCell colSpan={3} align="right">
                      {user?.name}
                    </TableCell>
                  </TableRow>
                  <TableRow hover role="checkbox">
                    <TableCell align="left">
                      <Typography variant="body1">Email</Typography>{" "}
                    </TableCell>
                    <TableCell colSpan={3} align="right">
                      {user?.email}
                    </TableCell>
                  </TableRow>
                  <TableRow hover role="checkbox">
                    <TableCell align="left">
                      <Typography variant="body1">Premium User</Typography>{" "}
                    </TableCell>
                    {user?.isPrimary ? (
                      <TableCell align="right">
                        {" "}
                        <Chip
                          icon={<PaidIcon />}
                          label="Premium"
                          color="success"
                        />
                      </TableCell>
                    ) : (
                      <TableCell align="right">
                        {" "}
                        <Chip
                          icon={<MoneyOffCsredIcon />}
                          label="Free"
                          color="warning"
                        />
                      </TableCell>
                    )}
                  </TableRow>
                  <TableRow hover role="checkbox">
                    <TableCell align="left">
                      <Typography variant="body1">Verified User</Typography>
                    </TableCell>
                    {user?.isVerified ? (
                      <TableCell align="right">
                        {" "}
                        <Chip
                          icon={<PaidIcon />}
                          label="Verified"
                          color="success"
                        />
                      </TableCell>
                    ) : (
                      <TableCell align="right">
                        {" "}
                        <Chip
                          icon={<MoneyOffCsredIcon />}
                          label="Not Verified"
                          color="warning"
                        />
                        <Button
                          style={{ marginLeft: "50px" }}
                          variant="contained"
                          onClick={() => handleVerify(user?.email)}
                        >
                          Verify Now
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                  <TableRow hover role="checkbox">
                    <TableCell align="left">
                      <Typography variant="body1">User Id</Typography>{" "}
                    </TableCell>
                    <TableCell colSpan={3} align="right">
                      {user?.id}
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default ProfilePage;
