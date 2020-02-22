import { useResource } from 'rest-hooks';
import React from "react";
import StarshipResource from './Resources/Starship';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 200
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ShipFetch = ({ name }: { name: string }) => {

  const ship = useResource(StarshipResource.detailShape(), { name });

  const classes = useStyles();
  return (
    <div style={{ display: "inline-block" }}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Name: {ship.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Model: {ship.model}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {ship.crew} crew members
            </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ShipFetch;