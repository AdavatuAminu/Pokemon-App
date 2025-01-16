import PokemonCard from '../PokemonCard/PokemonCard';
import SearchBar from '../SearchBar/SearchBar';

const PokemonList = ({ pokemonList, onSearch }) => {
  return (
    <div className="pokemon-list container">
      <SearchBar onSearch={onSearch} />
      <div className="row mt-4">
        {pokemonList.length > 0 ? (
          pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
          ))
        ) : (
          <p className="text-center">No Pokémon found.</p>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
