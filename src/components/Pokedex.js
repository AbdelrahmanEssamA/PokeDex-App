import React, { useEffect } from "react";
import { Grid, CardContent, Card, CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { toFirstCharUppercase } from "../constant";
import { usePokemon } from "../context/PokemonContext";

const useStyles = makeStyles({
   PokedexContainer: {
      width: "100%",
      margin: "0",
      paddingTop: "20px",
      paddingLeft: "50px",
      paddingRight: "50px",
      backgroundImage: `url(${"https://i.pinimg.com/originals/f2/5f/7a/f25f7aee4d558219fb64b9e2f223d64b.jpg"})`,
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      height: "100%",
      minHeight: "100vh",
   },
   cardMedia: {
      backgroundColor: "#fcfcfc",
      height: "auto",
      margin: "auto",
      cursor: "pointer",
      boxShadow: "0px 6px 60px rgba(0, 0, 0 , 0.15)",
      "&:hover": {
         boxShadow: "0px 6px 20px rgba(0, 0, 0 , 0.1)",
         transform: "scale(.97)",
      },
   },
   cardContent: {
      textAlign: "center",
   },
   pokemonImage: {
      width: "50%",
      height: "auto",
   },
   pokeID: {
      width: "100%",
      padding: "10px",
      background: "#ededed",
   },
});

const Pokedex = (props) => {
   const { pokemonData, setPokemonData, filter } = usePokemon();
   const classes = useStyles();
   const { history } = props;
   const searchFilter = filter;
   const fetchUrl = "https://pokeapi.co/api/v2/pokemon?limit=386";

   useEffect(() => {
      async function fetchData() {
         const request = await axios.get(fetchUrl);
         const result = request.data.results;
         const newPokemonData = {};
         result.forEach((pokemon, index) => {
            newPokemonData[index + 1] = {
               id: index + 1,
               name: pokemon.name,
               sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
               }.png`,
            };
         });
         setPokemonData(newPokemonData);
      }
      fetchData();
   }, [fetchUrl]);

   const DisplayPokemon = (id) => {
      history.push(`/${id}`);
   };
   const getPokemonCard = () => {
      return Object.keys(pokemonData).map(
         (id) =>
            pokemonData[id].name.includes(searchFilter) && (
               <Grid item xs={12} sm={6} md={3} key={id}>
                  <Card
                     elevation={6}
                     className={classes.cardMedia}
                     onClick={() => DisplayPokemon(id)}
                     style={{ transition: ".5s" }}
                  >
                     <Typography className={classes.pokeID}>{`${id}`}</Typography>
                     <CardContent className={classes.cardContent}>
                        {pokemonData ? (
                           <img
                              className={classes.pokemonImage}
                              src={pokemonData[id].sprite}
                              alt={pokemonData[id].name}
                           />
                        ) : (
                           <CircularProgress color='secondary' />
                        )}

                        <Typography className='typography'>{`${toFirstCharUppercase(
                           pokemonData[id].name
                        )}`}</Typography>
                     </CardContent>
                  </Card>
               </Grid>
            )
      );
   };

   return (
      <div>
         {pokemonData ? (
            <Grid container spacing={5} className={classes.PokedexContainer}>
               {getPokemonCard()}
            </Grid>
         ) : (
            <CircularProgress />
         )}
      </div>
   );
};

export default Pokedex;
