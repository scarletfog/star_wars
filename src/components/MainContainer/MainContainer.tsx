import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import ForcesSelector from '../ForcesSelector/ForcesSelector';
import ShipFetch from '../../utils/StarshipFetch';
import { PEOPLE_API } from '../../utils/apis';
import { STARSHIPS_API } from '../../utils/apis'


const MainContainer = () => {


  const [force, setForce] = useState('');
  const [fetchState, setFetchState] = useState('loading');

  
  useEffect(() => {

    if (force && force === "person") {
      console.log("person")
      fetch(PEOPLE_API)
        .then((response) => {
          return response.json();
        })
        .then((items) => {
          setFetchState('finished')
          console.log(items.count);
        });
    }

    if (force && force === "ship") {
      console.log("ship")

      fetch(STARSHIPS_API)
        .then((response) => {
          return response.json();
        })
        .then((items) => {
          setFetchState('finished')
          console.log(items.count);
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
          {fetchState === 'finished' ? <div>finished</div> : ''}
        </Typography>
      </Container>
    </>
  );
};

export default MainContainer;
