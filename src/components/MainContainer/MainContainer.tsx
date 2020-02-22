import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import PersonFetch from '../../utils/PersonFetch';
import PlayButton from '../PlayButton/PlayButton';



const MainContainer = () => {

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
        >
          <PlayButton />
          <PersonFetch name="1" />
        </Typography>
      </Container>
    </>
  );
};

export default MainContainer;
