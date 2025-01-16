import React, { useEffect, useState } from 'react';

const PokemonCard = ({ name, url }) => {
  const [pokemonsType, setPokemonsType] = useState(null);
  const [isDataLoading, settoLoading] = useState(true);

  const pokemonId = url.split('/').filter(Boolean).pop();

  useEffect(() => {
    const retrievePokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const data = await response.json();
        setPokemonsType(data.types.map((typeObj) => typeObj.type.name));
        settoLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon type:', error);
        settoLoading(false);
      }
    };

    retrievePokemonDetails();
  }, [pokemonId]);

  const fetchBackgroundColor = () => {
    if (!pokemonsType) return '#f8f9fa';

    const pokemonTypeColors = {
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

    const primaryType = pokemonsType[0];
    return pokemonTypeColors[primaryType] || '#f8f9fa';
  };

  return (
    <div className="col-lg-2 col-md-3 col-sm-6 mb-4">
      <div className="card h-100 text-center" style={{ backgroundColor: fetchBackgroundColor() }}>
        {isDataLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
              className="card-img-top img-fluid"
              alt={name}
            />
            <div className="card-body">
              <h5 className="card-title text-capitalize">{name}</h5>
              <a href={`/pokemon/${pokemonId}`} className="btn btn-primary">
                View Details
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
