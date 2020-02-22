import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpaceShuttle, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'

const ForcesSelector = (props: any) => {

  const { forceType } = props;

  const ship = <FontAwesomeIcon icon={faSpaceShuttle} />;
  const astronaut = <FontAwesomeIcon icon={faUserAstronaut} />

  return (
    <>
      {forceType === "ship" ? (<Button variant="contained" color="primary">  Ships {ship}  </Button>) : (<Button variant="contained" color="primary"> Person {astronaut} </Button>)}
    </>
  );
};

export default ForcesSelector;