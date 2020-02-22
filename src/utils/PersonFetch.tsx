import { useResource } from 'rest-hooks';
import React from "react";
import PersonResource from './Resources/Person';
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

const PersonFetch = ({ name }: { name: string }) => {
  const person = useResource(PersonResource.detailShape(), { name });

  const classes = useStyles();

  return (
    <div style={{ display: "inline-block" }}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Name: {person.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Gender: {person.gender}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Mass: {person.mass} kg
        </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default PersonFetch;