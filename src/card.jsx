import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard({ name, artistsName, img }) {

  return (
    <Card sx={{width: 300}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image={img?img:"/not-found.png"}
          alt="Album Cover / Artist Photo"
        />
        <CardContent sx={{height:90}}>
          <Typography noWrap gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {artistsName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


// { maxWidth: 345}