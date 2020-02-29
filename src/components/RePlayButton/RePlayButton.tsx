import React from "react";
import Button from "@material-ui/core/Button";

const isReplay = false;

const PlayButton = () => {

  return (
    <Button variant="contained" color="primary">
      {isReplay? 'Play again' : 'Play'}
    </Button>
  );
};

export default PlayButton;