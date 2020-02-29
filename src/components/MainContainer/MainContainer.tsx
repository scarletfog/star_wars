import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import ForcesSelector from '../ForcesSelector/ForcesSelector';
import Button from "@material-ui/core/Button";
import ShipCard from '../ShipCard/ShipCard';
import PersonCard from '../PersonCard/PersonCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import { STARSHIPS_API, PEOPLE_API } from '../../utils/apis';

import { getItem } from '../../utils/paginatedApi';

import { pickRandomItem, pickPaginated } from '../../utils/randomizer';
import { MatchStatuses } from '../../utils/matchStatuses';

const MainContainer = () => {
  const [matchWinner, setMatchWinner] = useState('');
  const [force, setForce] = useState('');
  const [fetchState, setFetchState] = useState('');
  const [shipsData, setShipsData] = useState([
    {
      name: '',
      model: '',
      crew: '',
    },
    {
      name: '',
      model: '',
      crew: '',
    },
  ]);

  const [peopleData, setPeopleData] = useState([
    {
      name: '',
      gender: '',
      mass: '',
      isWinner: false
    },
    {
      name: '',
      gender: '',
      mass: '',
      isWinner: false
    },
  ])


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

  useEffect(() => {

    const fetchData = () => {
      if (force === "person") {
        setFetchState('loading')
        fetch(PEOPLE_API)
          .then((response) => {
            return response.json();
          })
          .then(({ count }) => {
            const personA = pickRandomItem(1, count);
            const personB = pickRandomItem(1, count, [personA]);

            return Promise.all([getPlayer(personA, PEOPLE_API), getPlayer(personB, PEOPLE_API)])
          })
          .then((peopleArr) => {
            const [
              personA,
              personB,
            ] = peopleArr

            const massA = parseInt(personA.mass);
            const massB = parseInt(personB.mass);


            if (massA > massB) {
              setMatchWinner(MatchStatuses.WINNER_PLAYER_A)
            } else if (massA < massB) {
              setMatchWinner(MatchStatuses.WINNER_PLAYER_B)
            } else if (massA === massB) {
              setMatchWinner(MatchStatuses.WINNER_DRAW)
            } else {
              setMatchWinner(MatchStatuses.WINNER_NONE)
            }

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
            const shipA = pickRandomItem(1, count);
            const shipB = pickRandomItem(1, count, [shipA]);

            return Promise.all([getPlayer(shipA, STARSHIPS_API), getPlayer(shipB, STARSHIPS_API)])
          })
          .then((shipsArr) => {
            const [
              shipA,
              shipB,
            ] = shipsArr

            const crewA = parseInt(shipA.crew);
            const crewB = parseInt(shipB.crew);


            if (crewA > crewB) {
              setMatchWinner(MatchStatuses.WINNER_PLAYER_A)
            } else if (crewA < crewB) {
              setMatchWinner(MatchStatuses.WINNER_PLAYER_B)
            } else if (crewA === crewB) {
              setMatchWinner(MatchStatuses.WINNER_DRAW)
            } else {
              setMatchWinner(MatchStatuses.WINNER_NONE)
            }

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
          <h1>I want to compare two:</h1>
          <ForcesSelector forceType="ship" onClick={setForce} disabled={!!force} />
          <ForcesSelector forceType="person" onClick={setForce} disabled={!!force} />
          {fetchState === 'loading' && <LoadingSpinner />}
          <div>{fetchState === 'finished' && force === "ship" ? shipsData.map((i: any) => <ShipCard key={i.name} name={i.name} model={i.model} crew={i.crew} isWinner={i.playerName === matchWinner} />) : ''}</div>
          <div>{fetchState === 'finished' && force === "person" ? peopleData.map((i: any) => <PersonCard key={i.name} name={i.name} gender={i.gender} mass={i.mass} isWinner={i.playerName === matchWinner} />) : ''}</div>
          <div>{matchWinner === MatchStatuses.WINNER_NONE && 'Cannot specify the winner, at least one attribute is unknown or something went wrong'}</div>
          <div>{matchWinner === MatchStatuses.WINNER_DRAW && 'The match is a draw'}</div>
          {fetchState === 'finished' && matchWinner ? (<Button onClick={() => resetGame()} variant="contained" color="secondary"> Play once again </Button>) : null}
        </Typography>
      </Container>
    </>
  );
};

export default MainContainer;
