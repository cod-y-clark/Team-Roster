/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getPlayers } from '../api/playerData';
import { useAuth } from '../utils/context/authContext';
import PlayerCard from '../components/PlayerCard';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const { user } = useAuth();

  const getAllPlayers = () => {
    getPlayers(user.uid).then(setPlayers);
  };

  useEffect(() => {
    getAllPlayers();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/player/new" passHref>
        <Button>Add A Player</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {players.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllPlayers} />
        ))}
      </div>
    </div>
  );
}
