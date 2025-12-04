import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const BookingDetails = () => {
  return (
    <div className="h-full  ">
      <Grid container spacing={5}>
        <Grid
          sx={{ background: "#FEFEFE" }}
          className="shadow p-5 !rounded-2xl"
          size={5}
        >
          <div className="mb-10">
            <h1 className="font-bold text-3xl mb-3">Booking Id # 100044</h1>
            <p>Placed on 05 Jul 2025 05:54:pm</p>
            <p className="mb-10">Scheduled At on 05 Jul 2025 11:54:pm</p>

            <p className="mb-2 text-lg">
              Provider: <span className="font-semibold">RiderMaster Taxis</span>
            </p>
            <p className="mb-2 text-lg">
              Trip Type:{" "}
              <span className="font-semibold">Hourly(Scheduled)</span>
            </p>
            <p className="mb-2 text-lg">
              Total Hour: <span className="font-semibold">3 Hurs</span>
            </p>
            <p className="mb-2 text-lg">
              Trip Status:{" "}
              <span className="font-semibold text-green-700">Completed</span>
            </p>
            <p className="mb-2 text-lg">
              Payment Status:{" "}
              <span className="font-semibold text-red-700">Unpaid</span>
            </p>
          </div>

          <Box>
            <Card
              title="Guest Info"
              sx={{ maxWidth: 400, padding: "10px", marginBottom: "30px;" }}
            >
              <Typography
                variant="h5"
                sx={{ color: "var(--color-primary)", fontWeight: 500 }}
              >
                Guest
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{ height: 100, width: 100, borderRadius: "50px" }}
                  src="/profile14.jpg"
                  title="Profile"
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    Black Smith
                  </Typography>
                  <Typography variant="body1">34 Trip</Typography>
                  <Typography variant="body1">+80*********</Typography>
                  <Typography variant="body1">
                    b**************@gmail.com
                  </Typography>
                </CardContent>
              </Box>
            </Card>

            <Card title="Guest Info" sx={{ maxWidth: 400, padding: "10px" }}>
              <Typography
                variant="h5"
                sx={{ color: "var(--color-primary)", fontWeight: 500 }}
              >
                Guest
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{ height: 100, width: 100, borderRadius: "50px" }}
                  src="/profile14.jpg"
                  title="Profile"
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    Black Smith
                  </Typography>
                  <Typography variant="body1">34 Trip</Typography>
                  <Typography variant="body1">+80*********</Typography>
                  <Typography variant="body1">
                    b**************@gmail.com
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Box>
        </Grid>
        <Grid size={7}>
          <h1 className="text-green-700 text-2xl font-semibold mb-4">
            Service List
          </h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead sx={{ background: "var(--color-primary)" }}>
                <TableRow>
                  <TableCell
                    sx={{ color: "#fff", fontWeight: 600, fontSize: 17 }}
                  >
                    #
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fff", fontWeight: 600, fontSize: 17 }}
                  >
                    Vehicle Details
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fff", fontWeight: 600, fontSize: 17 }}
                  >
                    Total Guest
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fff", fontWeight: 600, fontSize: 17 }}
                  >
                    Hour
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fff", fontWeight: 600, fontSize: 17 }}
                  >
                    Fare
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 18 }}
                    >
                      <img
                        src="https://images.pexels.com/photos/100656/pexels-photo-100656.jpeg"
                        alt="Car"
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                      <div className="">
                        <Typography variant="h5" sx={{ fontWeight: 500 }}>
                          Nissan Leaf
                        </Typography>
                        <p className="font-bold text-lg">
                          Category:{" "}
                          <span className="font-normal text-lg">
                            Nissan Leaf
                          </span>
                        </p>
                        <p className="font-bold text-lg">
                          Brand: <span>Nissan</span>
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>3 Hrs</TableCell>
                  <TableCell>$15115.00</TableCell>
                </TableRow>

                {/* Summary  */}
                {/* <TableRow>  
                    <TableCell rowSpan={3}/>
                    <TableCell >Subtotal</TableCell>
                    <TableCell >1234</TableCell>
                </TableRow>
                <TableRow>                    
                    <TableCell >Tax</TableCell>
                    <TableCell >10%</TableCell>
                </TableRow>

                <TableRow>                    
                    <TableCell >Total</TableCell>
                    <TableCell >1450</TableCell>
                </TableRow> */}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">aa</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">adsa</TableCell>
                  <TableCell align="right">aa</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">aa</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default BookingDetails;


