import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
});

const ShipFetch = (props: any) => {

  const { name = '', model = '', crew = '', isWinner = false } = props;


  const classes = useStyles();
  return (
    <div style={{ display: "inline-block" }}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            <b>Name: </b> {name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <b>Model: </b> {model}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <b>{crew} </b> crew member(s)
            </Typography>
          {isWinner && <Typography className={classes.pos} color="textSecondary">
            <b> Wins! </b>
          </Typography>}
        </CardContent>
      </Card>
    </div>
  );
}

export default ShipFetch;