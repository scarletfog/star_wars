import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import ForcesSelector from '../ForcesSelector/ForcesSelector';
import Button from "@material-ui/core/Button";

import ShipCard from '../ShipCard/ShipCard';
import PersonCard from '../PersonCard/PersonCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './MainContainer.css';

import { PersonDataType, ShipDataType } from '../../utils/playerModels';

import { ForceType, MatchStatus, FetchingStatus } from '../../utils/constants';
import { getWinner, fetchCount, fetchRandomPersons, fetchRandomShips } from '../../utils/index';

const MainContainer = () => {
  const [apiCounts, setApiCounts] = useState<{ [key: string]: number }>({});

  const [matchWinner, setMatchWinner] = useState<MatchStatus>();
  const [force, setForce] = useState<ForceType>();
  const [fetchState, setFetchState] = useState('');

  const [shipsData, setShipsData] = useState<ShipDataType[]>([]);
  const [peopleData, setPeopleData] = useState<PersonDataType[]>([]);

  const resetGame = (): void => {
    setForce(undefined);
    setPeopleData([]);
    setShipsData([]);
    setMatchWinner(undefined);
  }

  const handleSelectForce = async (force: ForceType) => {
    resetGame();
    setForce(force);

    if (force) {
      setFetchState(FetchingStatus.LOADING);
      let count = apiCounts[force];

      if (!apiCounts[force]) {
        count = await fetchCount(force)
        setApiCounts({
          ...apiCounts,
          [force]: count,
        });
      }

      let matchStatus;
      if (force === ForceType.PERSON) {
        const persons = await fetchRandomPersons(count);
        const [personA, personB] = persons;
        matchStatus = getWinner(personA.mass, personB.mass);
        setPeopleData(persons);
      } else if (force === ForceType.SHIP) {
        const ships = await fetchRandomShips(count);
        const [shipA, shipB] = ships;
        matchStatus = getWinner(shipA.crew, shipB.crew);
        setShipsData(ships);
      }
      setMatchWinner(matchStatus);
      setFetchState(FetchingStatus.FINISHED);
    }
  }

  const [ShipP1, ShipP2] = shipsData;
  const [PersonP1, PersonP2] = peopleData;

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Typography
          component="div"
          style={{ backgroundColor: "#284f72", height: "100vh" }}
        >
          <h1 className="Header">I want to compare two:</h1>

          <div data-testid="forces_selector"><ForcesSelector forceType={ForceType.SHIP} onClick={handleSelectForce} disabled={!!force} />
            <ForcesSelector forceType={ForceType.PERSON} onClick={handleSelectForce} disabled={!!force} /></div>
          {fetchState === FetchingStatus.LOADING && <LoadingSpinner data-testid="spinner_overlay" />}
          {fetchState === FetchingStatus.FINISHED &&
            <div>
              {
                force === ForceType.SHIP && <>
                  <ShipCard {...ShipP1} isWinner={matchWinner === MatchStatus.WINNER_PLAYER_A} />
                  <ShipCard {...ShipP2} isWinner={matchWinner === MatchStatus.WINNER_PLAYER_B} />
                </>
              }
              {
                force === ForceType.PERSON && <>
                  <PersonCard {...PersonP1} isWinner={matchWinner === MatchStatus.WINNER_PLAYER_A} />
                  <PersonCard {...PersonP2} isWinner={matchWinner === MatchStatus.WINNER_PLAYER_B} />
                </>
              }
            </div>
          }
          <div style={{ color: "#fff", margin: "10px" }} data-testid="none_winner">{matchWinner === MatchStatus.WINNER_NONE && 'Cannot specify the winner, at least one value is unknown or something went wrong'}</div>
          <div style={{ color: "#fff", margin: "10px" }} data-testid="match_draw">{matchWinner === MatchStatus.WINNER_DRAW && 'The match is a draw'}</div>
          {matchWinner ? (<Button onClick={() => resetGame()} variant="contained" color="secondary" data-testid="play_button"> Play once again </Button>) : null}
        </Typography>
      </Container>
    </>
  );
};

export default MainContainer;
