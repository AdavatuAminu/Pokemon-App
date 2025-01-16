import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import PokemonList from './components/PokemonList/PokemonList';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';

const App = () => {
  
  const [pokemonsList, settingPokemonsList] = useState([]);
  const [filteringPokemons, settingFilteredPokemons] = useState([]);

  
  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then((response) => {
        settingPokemonsList(response.data.results);
        settingFilteredPokemons(response.data.results);
      })
      .catch((error) => console.error('Error fetching Pokémon:', error));
  }, []);

  
  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) {
      settingFilteredPokemons(pokemonsList);
    } else {
      settingFilteredPokemons(
        pokemonsList.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  };

  // Rendering
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PokemonList
              pokemonList={filteringPokemons} // Use renamed variable
              onSearch={handleSearch}
            />
          }
        />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
