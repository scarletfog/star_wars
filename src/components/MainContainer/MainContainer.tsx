import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import PersonFetch from '../../utils/PersonFetch';
import ForcesSelector from '../ForcesSelector/ForcesSelector';
import ShipFetch from '../../utils/StarshipFetch';


const MainContainer = () => {

  const [force, setForce] = useState('');

  console.log(force)

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
        >
          <ForcesSelector forceType="ship" onClick={() => setForce("ship")} />
          <ForcesSelector forceType="person" onClick={() => setForce("person")}  />

          {/* <PersonFetch name="1" />
          <ShipFetch name="3" /> */}
        </Typography>
      </Container>
    </>
  );
};

export default MainContainer;
