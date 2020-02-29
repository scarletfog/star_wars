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
  winner: {
    color: '#2E8B57',
  },
});

const PersonCard = (props: any) => {

  const { name = '', gender = '', mass = '', isWinner = 'false' } = props;

  const classes = useStyles();

  return (
    <div style={{ display: "inline-block" }}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            <b>Name: </b> {name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <b>Gender: </b> {gender}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <b>Mass: </b> {mass}
          </Typography>
          {isWinner && <Typography className={classes.winner} color="textSecondary">
            <b> Wins! </b>
          </Typography>}
        </CardContent>
      </Card>
    </div>
  );
}

export default PersonCard;