import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import ForcesSelector from '../ForcesSelector/ForcesSelector';
import Button from "@material-ui/core/Button";
import ShipCard from '../ShipCard/ShipCard';
// import PersonCard from '../PersonCard/PersonCard';

import { STARSHIPS_API } from '../../utils/apis';
import { getItem } from '../../utils/paginatedApi';

import { PickRandomItem, PickPaginated } from '../../utils/randomizer';

const MATCH_WINNER_PLAYER_A = 'MATCH_WINNER_PLAYER_A';
const MATCH_WINNER_PLAYER_B = 'MATCH_WINNER_PLAYER_B';
const MATCH_WINNER_DRAW = 'MATCH_WINNER_DRAW';
const MATCH_WINNER_NONE = 'MATCH_WINNER_NONE';

const MainContainer = () => {
  const [matchWinner, setMatchWinner] = useState('');
  const [force, setForce] = useState('');
  const [fetchState, setFetchState] = useState('loading');
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

  useEffect(() => {

    const getShip = (shipNumber: number) => {
      const { page, elem } = PickPaginated(shipNumber);
      return getItem(page, elem, STARSHIPS_API)
    }

    const fetchData = () => {
      // if (force && force === "person") {
      //   fetch(PEOPLE_API)
      //     .then((response) => {
      //       return response.json();
      //     })
      //     .then((items) => {
      //       setFetchState('finished')
      //     });
      // }
      if (force === "ship") {
        fetch(STARSHIPS_API)
          .then((response) => {
            return response.json();
          })
          .then(({ count }) => {
            const shipA = PickRandomItem(1, count);
            const shipB = PickRandomItem(1, count, [shipA]);

            return Promise.all([getShip(shipA), getShip(shipB)])
          })
          .then((shipsArr) => {
            const [
              shipA,
              shipB,
            ] = shipsArr

            const crewA =  parseInt(shipA.crew);
            const crewB =  parseInt(shipB.crew);

            // crewA > parseInt(shipsArr[1].crew) ? Object.assign(shipsArr[0], { isWinner: true }) : Object.assign(shipsArr[1], { isWinner: true })

            if (crewA > crewB) {
              setMatchWinner(MATCH_WINNER_PLAYER_A)
            } else if (crewA < crewB) {
              setMatchWinner(MATCH_WINNER_PLAYER_B)
            } else if (crewA === crewB) {
              setMatchWinner(MATCH_WINNER_DRAW)
            } else {
              setMatchWinner(MATCH_WINNER_NONE)
            }

            // add handling MATCH_WINNER_draw and unknown number of crew members
            setShipsData([
              {...shipA, playerName: MATCH_WINNER_PLAYER_A},
              {...shipB, playerName: MATCH_WINNER_PLAYER_B},
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
          <ForcesSelector forceType="person" onClick={setForce} disabled />
          {/* {fetchState === 'finished' && force === "person" ? (<div><PersonCard/> <PersonCard/> </div>) : ''} */}
          <div>{fetchState === 'finished' && force === "ship" ? shipsData.map((i: any) => <ShipCard key={i.name} name={i.name} model={i.model} crew={i.crew} isWinner={i.playerName === matchWinner} />) : ''}</div>
          {matchWinner === MATCH_WINNER_NONE && 'cant speficy winner'}
          {matchWinner === MATCH_WINNER_DRAW && 'MATCH_WINNER_DRAW'}
          {fetchState === 'finished' && force ? (<Button onClick={() => setForce('')} variant="contained" color="secondary"> Play once again </Button>) : null}
        </Typography>
      </Container>
    </>
  );
};

export default MainContainer;


// i.crew compare
