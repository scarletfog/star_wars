import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import ForcesSelector from '../ForcesSelector/ForcesSelector';
import PersonFetch from '../../utils/PersonFetch';
import ShipFetch from '../../utils/StarshipFetch';

import { PEOPLE_API, STARSHIPS_API  } from '../../utils/apis';
import { PickRandom } from '../../utils/randomizer';


const MainContainer = () => {


  const [force, setForce] = useState('');
  const [fetchState, setFetchState] = useState('loading');


  useEffect(() => {

    if (force && force === "person") {
      fetch(PEOPLE_API)
        .then((response) => {
          return response.json();
        })
        .then((items) => {
          setFetchState('finished')
          console.log(PickRandom(items.count));
        });
    }

    if (force && force === "ship") {
      fetch(STARSHIPS_API)
        .then((response) => {
          return response.json();
        })
        .then((items) => {
          setFetchState('finished')
          console.log(PickRandom(items.count));
        });
    }
    return undefined
  }
  )

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Typography
          component="div"
          style={{ backgroundColor: "#284f72", height: "100vh" }}
        >
          <ForcesSelector forceType="ship" onClick={setForce} />
          <ForcesSelector forceType="person" onClick={setForce} />
          {fetchState === 'finished' && force === "person" ? (<div><PersonFetch name="2" /> <PersonFetch name="3" /> </div>) : ''}
          {fetchState === 'finished' && force === "ship" ? (<div><ShipFetch name="5" /> <ShipFetch name="2" /> </div>) : ''}
        </Typography>
      </Container>
    </>
  );
};

export default MainContainer;
