import React, { useState, useContext } from "react";

const PokeContext = React.createContext();
export function usePokemon() {
   return useContext(PokeContext);
}
export function PokemonProvider({ children }) {
   const [pokemonData, setPokemonData] = useState();
   const [filter, setFilter] = useState("");
   const value = { pokemonData, setPokemonData, filter, setFilter };
   return (
      <div>
         <PokeContext.Provider value={value}>{children}</PokeContext.Provider>
      </div>
   );
}
