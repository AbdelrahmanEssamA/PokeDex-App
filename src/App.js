import { Route, Switch } from "react-router-dom";
import Pokedex from "./components/Pokedex";
import Pokemon from "./components/Pokemon";
import { PokemonProvider } from "./context/PokemonContext";
import NavBar from "./components/NavBar";
function App() {
   return (
      <div>
         <PokemonProvider>
            <NavBar />
            <Switch>
               <Route exact path='/' render={(props) => <Pokedex {...props} />} />
               <Route
                  exact
                  path='/:pokemonId'
                  render={(props) => <Pokemon {...props} />}
               />
            </Switch>
         </PokemonProvider>
      </div>
   );
}

export default App;
