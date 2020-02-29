import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import ForcesSelector from '../ForcesSelector/ForcesSelector';
import Button from "@material-ui/core/Button";
import ShipCard from '../ShipCard/ShipCard';
import PersonCard from '../PersonCard/PersonCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './MainContainer.css';

import { STARSHIPS_API, PEOPLE_API } from '../../utils/apis';

import { getItem } from '../../utils/paginatedApi';

import { personDataModel, shipDataModel } from '../../utils/playerModels';
import { pickRandomItem, pickPaginated } from '../../utils/randomizer';
import { MatchStatuses } from '../../utils/matchStatuses';

const MainContainer = () => {
  const [matchWinner, setMatchWinner] = useState('');
  const [force, setForce] = useState('');
  const [fetchState, setFetchState] = useState('');
  const [shipsData, setShipsData] = useState([shipDataModel]);
  const [peopleData, setPeopleData] = useState([personDataModel])

  const resetGame = (): void => {
    setForce('');
    setShipsData([]);
    setPeopleData([]);
    setMatchWinner('');
  }

  const getPlayer = (playerNumber: number, api: string): Promise<any> => {
    const { page, elem } = pickPaginated(playerNumber);
    return getItem(page, elem, api)
  }

  const getRandomizedItem = (count: number, api: string): Promise<Array<any>> => {
    const playerA = pickRandomItem(1, count);
    const playerB = pickRandomItem(1, count, [playerA]);

    return Promise.all([getPlayer(playerA, api), getPlayer(playerB, api)])
  }

  const getWinner = (attributeA: number, attributeB: number) => {
    if (attributeA > attributeB) {
      setMatchWinner(MatchStatuses.WINNER_PLAYER_A)
    } else if (attributeA < attributeB) {
      setMatchWinner(MatchStatuses.WINNER_PLAYER_B)
    } else if (attributeA === attributeB) {
      setMatchWinner(MatchStatuses.WINNER_DRAW)
    } else {
      setMatchWinner(MatchStatuses.WINNER_NONE)
    }
  }


  useEffect(() => {

    const fetchData = () => {
      if (force === "person") {
        setFetchState('loading')
        fetch(PEOPLE_API)
          .then((response) => {
            return response.json();
          })
          .then(({ count }) => {
            return getRandomizedItem(count, PEOPLE_API)
          })
          .then((peopleArr) => {
            const [
              personA,
              personB,
            ] = peopleArr

            const massA = parseInt(personA.mass);
            const massB = parseInt(personB.mass);

            getWinner(massA, massB)

            setPeopleData([
              { ...personA, playerName: MatchStatuses.WINNER_PLAYER_A },
              { ...personB, playerName: MatchStatuses.WINNER_PLAYER_B },
            ])
            setFetchState('finished')
          })
      }
      if (force === "ship") {
        setFetchState('loading')
        fetch(STARSHIPS_API)
          .then((response) => {
            return response.json();
          })
          .then(({ count }) => {
            return getRandomizedItem(count, STARSHIPS_API)
          })
          .then((shipsArr) => {
            const [
              shipA,
              shipB,
            ] = shipsArr

            const crewA = parseInt(shipA.crew);
            const crewB = parseInt(shipB.crew);

            getWinner(crewA, crewB)

            setShipsData([
              { ...shipA, playerName: MatchStatuses.WINNER_PLAYER_A },
              { ...shipB, playerName: MatchStatuses.WINNER_PLAYER_B },
            ])
            setFetchState('finished')
          })
      }
    };

    fetchData();
  }, [force]);

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Typography
          component="div"
          style={{ backgroundColor: "#284f72", height: "100vh" }}
        >
          <h1 className="Header">I want to compare two:</h1>
          <ForcesSelector forceType="ship" onClick={setForce} disabled={!!force} />
          <ForcesSelector forceType="person" onClick={setForce} disabled={!!force} />
          {fetchState === 'loading' && <LoadingSpinner />}
          <div>{fetchState === 'finished' && force === "ship" ? shipsData.map((i: any) => <ShipCard key={i.name} name={i.name} model={i.model} crew={i.crew} isWinner={i.playerName === matchWinner} />) : ''}</div>
          <div>{fetchState === 'finished' && force === "person" ? peopleData.map((i: any) => <PersonCard key={i.name} name={i.name} gender={i.gender} mass={i.mass} isWinner={i.playerName === matchWinner} />) : ''}</div>
          <div>{matchWinner === MatchStatuses.WINNER_NONE && 'Cannot specify the winner, at least one value is unknown or something went wrong'}</div>
          <div>{matchWinner === MatchStatuses.WINNER_DRAW && 'The match is a draw'}</div>
          {fetchState === 'finished' && matchWinner ? (<Button onClick={() => resetGame()} variant="contained" color="secondary"> Play once again </Button>) : null}
        </Typography>
      </Container>
    </>
  );
};

export default MainContainer;
