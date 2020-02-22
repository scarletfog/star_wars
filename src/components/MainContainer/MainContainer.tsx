import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import ForcesSelector from '../ForcesSelector/ForcesSelector';
import PersonFetch from '../../utils/PersonFetch';
import ShipFetch from '../../utils/StarshipFetch';
import Button from "@material-ui/core/Button";

import { PEOPLE_API, STARSHIPS_API } from '../../utils/apis';
import { PickRandomItem } from '../../utils/randomizer';


const MainContainer = () => {

  const [force, setForce] = useState('');
  const [personCount, setPersonCount] = useState(0);
  const [fetchState, setFetchState] = useState('loading');

  useEffect(() => {

    if (force && force === "person") {
      fetch(PEOPLE_API)
        .then((response) => {
          return response.json();
        })
        .then((items) => {
          setPersonCount(items.count);
          setFetchState('finished')
        });
    }

    if (force && force === "ship") {
      fetch(STARSHIPS_API)
        .then((response) => {
          return response.json();
        })
        .then((items) => {
          return PickRandomItem(1, items.count, STARSHIPS_API)
        })
        .then((item) => {
          setFetchState('finished')
        })
    }
    return undefined
  })

  const p1 = Math.floor(Math.random() * (personCount - 1 + 1) + 1)

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Typography
          component="div"
          style={{ backgroundColor: "#284f72", height: "100vh" }}
        >
          <ForcesSelector forceType="ship" onClick={setForce} disabled={!!force} />
          <ForcesSelector forceType="person" onClick={setForce} disabled={!!force} />
          {fetchState === 'finished' && force === "person" ? (<div><PersonFetch name={`${p1}`}/> <PersonFetch name="3" /> </div>) : ''}
          {fetchState === 'finished' && force === "ship" ? (<div><ShipFetch name="5" /> <ShipFetch name="2" /> </div>) : ''}
          {fetchState === 'finished' && force ? (<Button onClick={() => setForce('')} variant="contained" color="secondary"> Play once again </Button>) : null}
        </Typography>
      </Container>
    </>
  );
};

export default MainContainer;
