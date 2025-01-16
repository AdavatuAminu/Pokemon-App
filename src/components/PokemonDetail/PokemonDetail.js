import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const pokemonsTypeColors = {
  fire: '#FF6347',
  water: '#20B2AA',
  grass: '#228B22',
  electric: '#FFD700',
  psychic: '#8A2BE2',
  ghost: '#8B008B',
  bug: '#32CD32',
  fairy: '#FF1493',
  dragon: '#8B0000',
  ice: '#00CED1',
  normal: '#D3D3D3',
  rock: '#C6A500',
  poison: '#6A0DAD',
  ground: '#D2691E',
  fighting: '#B22222',
  steel: '#C0C0C0',
  dark: '#2F4F4F',
};

const PokemonDetails = () => {
  const { id } = useParams();
  const [creatureDetails, settingPokemons] = useState(null);
  const [getError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchingPokemonsDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        settingPokemons(response.data);
      } catch {
        setFetchError('Unable to load Pokémon details. Try again later.');
      }
    };
    fetchingPokemonsDetails();
  }, [id]);

  if (getError) return <p className="error-message">{getError}</p>;
  if (!creatureDetails) return <p>Loading creature details...</p>;

  const basicPrimaryCategory = creatureDetails.types[0]?.type.name;
  const cardBackgroundColor = pokemonsTypeColors[basicPrimaryCategory] || '#D3D3D3';

  return (
    <div
      className="creature-details"
      style={{
        backgroundColor: cardBackgroundColor,
        color: basicPrimaryCategory === 'electric' ? '#000' : '#fff',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        maxWidth: '500px',
        margin: '20px auto',
      }}
    >
      <h1 className="capitalize">{creatureDetails.name}</h1>
      <img
        src={creatureDetails.sprites.front_default}
        alt={creatureDetails.name}
        className="creature-image"
        style={{ width: '200px', height: 'auto', marginBottom: '20px' }}
      />
      <div>
        <h2>Creature Info</h2>
        <p>Height: {creatureDetails.height} decimetres</p>
        <p>Weight: {creatureDetails.weight} hectograms</p>
        <p>Base XP: {creatureDetails.base_experience}</p>
        <h3>Abilities:</h3>
        <ul>
          {creatureDetails.abilities.map((abilityItem) => (
            <li key={abilityItem.ability.name}>{abilityItem.ability.name}</li>
          ))}
        </ul>
        <h3>Categories:</h3>
        <ul>
          {creatureDetails.types.map((typeItem) => (
            <li key={typeItem.type.name}>{typeItem.type.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetails;
