import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        marginTop: 8,
        marginX: 8,
        display: "flex",
        flexDirection: "grid",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Card sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Habit 1
          </Typography>
          <Typography variant="body2">Description of habit.</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Update</Button>
          <Button size="small">Progress</Button>
          <Button size="small" color="error">
            Delete
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Habit 2
          </Typography>
          <Typography variant="body2">Description of habit.</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Update</Button>
          <Button size="small">Progress</Button>
          <Button size="small" color="error">
            Delete
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Habit 3
          </Typography>
          <Typography variant="body2">Description of habit.</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Update</Button>
          <Button size="small">Progress</Button>
          <Button size="small" color="error">
            Delete
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Habit 4
          </Typography>
          <Typography variant="body2">Description of habit.</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Update</Button>
          <Button size="small">Progress</Button>
          <Button size="small" color="error">
            Delete
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Habit 5
          </Typography>
          <Typography variant="body2">Description of habit.</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Update</Button>
          <Button size="small">Progress</Button>
          <Button size="small" color="error">
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
