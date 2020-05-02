import React, { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import axiosWithAuth  from '../utils/axiosWithAuth.js';

const Jokes = () => {
  const [jokesList, setJokesList] = useState([]); 
  useEffect(() => {
    axiosWithAuth()
      .get('/api/jokes')
      .then((response) => {
        // console.log(response, 'the response')
        setJokesList(response.data);
      })
      .catch((err) => (err)); 
  }, []);


  return (
    <div className="container">
      <h1>Jokes List</h1>
      <div className="cards-wrapper">
        <Card.Group>
          {jokesList.map((jokeItem) => (
               <Card key={jokeItem.id}>
               <Card.Content>
                 <Card.Header>Joke: {jokeItem.joke}</Card.Header>
               </Card.Content>
             </Card>
          ))}
        </Card.Group>
      </div>
    </div>
  );
};

export default Jokes;