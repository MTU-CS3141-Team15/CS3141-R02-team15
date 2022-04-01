import {
  Button,
  Card,
  CardActions,
  CardContent,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";

interface HabitCardProps {
  name: string;
  description: string;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  onUpdate?: React.MouseEventHandler<HTMLButtonElement>;
  onProgress?: React.MouseEventHandler<HTMLButtonElement>;
  sx?: SxProps<Theme>;
}

export default function HabitCard({
  name,
  description,
  onDelete,
  onUpdate,
  onProgress,
  sx,
}: HabitCardProps) {
  return (
    <Card sx={sx}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onUpdate}>
          Update
        </Button>
        <Button size="small" onClick={onProgress}>
          Progress
        </Button>
        <Button size="small" color="error" onClick={onDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
