import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    maxWidth: 200,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const PersonCard = (props: any) => {

  const {name = '', gender = '', mass = ''} = props;

  const classes = useStyles();

  return (
    <div style={{ display: "inline-block" }}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Name: {name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Gender: {gender}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Mass: {mass} kg
        </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default PersonCard;