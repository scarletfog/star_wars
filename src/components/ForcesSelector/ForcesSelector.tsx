import React from "react";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpaceShuttle, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'

const ForcesSelector = (props: any) => {
  const { forceType, onClick, disabled } = props;
  const handleClick = () => onClick(forceType);
  const isShip = forceType === "ship";
  const icon = isShip ? faSpaceShuttle : faUserAstronaut;
  const wording = isShip ? 'Ships' : 'People';

  return (
    <Button onClick={handleClick} disabled={disabled} variant="contained" color="primary" style={{ margin: "10px", padding: "10px" }} data-testid={`${wording}_button`}>
      {wording} <FontAwesomeIcon icon={icon} style={{ margin: "5px"}} />
    </Button>
  );
};

export default ForcesSelector;