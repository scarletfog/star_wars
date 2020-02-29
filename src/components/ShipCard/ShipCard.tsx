import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { ShipDataType } from '../../utils/playerModels';

const useStyles = makeStyles({
  root: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
  winner: {
    color: '#2E8B57',
  },
});

const ShipCard = (props: ShipDataType & { isWinner: boolean }) => {
  const classes = useStyles();

  return (
    <div style={{ display: "inline-block" }}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            <b>Name: </b> {props.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <b>Model: </b> {props.model}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <b>{props.crew} </b> crew member(s)
            </Typography>
          {props.isWinner && <Typography className={classes.winner} color="textSecondary">
            <b> Wins! </b>
          </Typography>}
        </CardContent>
      </Card>
    </div>
  );
}

export default ShipCard;