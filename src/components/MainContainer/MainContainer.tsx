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

const MainContainer = () => {
  const [force, setForce] = useState('');
  const [fetchState, setFetchState] = useState('loading');
  const [shipsData, setShipsData] = useState([
    {
      name: '',
      model: '',
      crew: '',
      isWinner: false
    },
    {
      name: '',
      model: '',
      crew: '',
      isWinner: false
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
  const shipsArr: any = [];


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
          .then((ships) => {
            shipsArr.push(...ships);
          })
          .then(() => {

            parseInt(shipsArr[0].crew) > parseInt(shipsArr[1].crew) ? Object.assign(shipsArr[0], {isWinner: true}) : Object.assign(shipsArr[1], {isWinner: true})
            // add handling draw and unknown number of crew members
            console.log(shipsArr)
    
            setShipsData(shipsArr)
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
          <div>{fetchState === 'finished' && force === "ship" ? shipsData.map((i:any) =><ShipCard key={i.name} name={i.name} model={i.model} crew={i.crew} isWinner={i.isWinner} />) : ''}</div>
          {fetchState === 'finished' && force ? (<Button onClick={() => setForce('')} variant="contained" color="secondary"> Play once again </Button>) : null}
        </Typography>
      </Container>
    </>
  );
};

export default MainContainer;


// i.crew compare
