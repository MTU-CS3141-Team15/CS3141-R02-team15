import { Button, Box, Grid, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <Box sx={{ flexGrow: 1, margin: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <h1>Build habits that last, in Habit Helper</h1>
            <p>
              Create trackers for all your routines and get feedback on your
              progress. Just log a habit daily if you complete it and check how
              you have been keeping up with the progress button.
            </p>
          </Grid>
          <Grid item xs={8}>
            <Box
              component="img"
              sx={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
                border: "5px solid theme.palette.primary",
                borderRadius: "5px",
              }}
              alt="Homepage Image"
              src="https://user-images.githubusercontent.com/65916505/164077043-5c0b4083-381a-4f77-a86b-3bd8832afc37.png"
            />
          </Grid>
          <Grid item xs={4}>
            <Box
              component="img"
              sx={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
                border: "5px solid theme.palette.primary",
                borderRadius: "5px",
              }}
              alt="Homepage Image"
              src="https://i.fbcd.co/products/resized/resized-1500-1000/9eab6aa6c8687761e72b0fc65ac2ec2039b143bfaacc727f078a26e07e033783.webp"
            />
          </Grid>
          <Grid item xs={8}>
            <h1>Security matters</h1>
            <p>
              We built our app with security in mind. Account data is secured
              with a state of the art hashing algorithm. Cookies can only be
              sent securly and requests can only be made from valid users. So
              your data is safe here.
            </p>
            <h2>Ready to get started?</h2>
            <Button
              type="submit"
              variant="contained"
              component={RouterLink}
              to="/login"
            >
              Login
            </Button>
            <br />
            <br />
            <Link component={RouterLink} to="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
