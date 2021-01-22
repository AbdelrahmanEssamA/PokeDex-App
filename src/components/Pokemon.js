import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Link, CircularProgress, Button, Card, CardContent } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { toFirstCharUppercase } from "../constant";

import axios from "axios";
const useStyles = makeStyles({
   body: {
      textAlign: "center",
      marginTop: "0",
      backgroundImage: `url(${"https://i.pinimg.com/originals/f2/5f/7a/f25f7aee4d558219fb64b9e2f223d64b.jpg"})`,
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      paddingTop: "50px",
      height: "90vh",
   },
   cardContent: {
      textAlign: "center",
   },

   card: {
      width: "80%",
      margin: "auto",

      marginBottom: "50px",
      backgroundColor: "#fafafa",
   },

   title: {
      padding: "20px",
      textAlign: "left",
      width: "100%",
      backgroundColor: "#ededed",
   },
   Typography: {
      padding: "5px",
   },
   chip: {
      margin: "3px",
      fontSize: "1rem",
      padding: "3px",
   },
});
const Pokemon = (props) => {
   const { match } = props;
   const { params } = match;
   const { pokemonId } = params;
   const { history } = props;
   const [pokemon, setPokemon] = useState(undefined);
   const fetchUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
   const classes = useStyles();
   console.log(fetchUrl);
   useEffect(() => {
      async function fetchData() {
         const request = await axios.get(fetchUrl).catch(function (error) {
            setPokemon(false);
         });
         if (request === undefined) setPokemon(false);
         else {
            const result = request.data;
            setPokemon(result);
            return result;
         }
      }
      fetchData();
   }, [fetchUrl]);

   const generatePokemon = () => {
      const { name, id, species, height, weight, types } = pokemon;
      const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

      return (
         <Card className={classes.card} elevation={6}>
            <Typography className={classes.title} variant='h4'>
               {`${id}.`} {toFirstCharUppercase(name)}
            </Typography>
            <CardContent className={classes.cardContent}>
               <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} alt={name} />
               <Typography className={classes.Typography} variant='h3'>
                  Pokemon Info
               </Typography>
               <Typography>
                  {"Species: "}
                  <Link href={species.url}>{species.name} </Link>
               </Typography>
               <Typography className={classes.Typography}>Height: {height} </Typography>
               <Typography className={classes.Typography}>Weight: {weight} </Typography>
               <Typography className={classes.Typography} variant='h6'>
                  {" "}
               </Typography>
               {types.map((typeInfo) => {
                  const { type } = typeInfo;
                  const { name } = type;
                  return (
                     <Chip
                        className={classes.chip}
                        key={name}
                        label={`${name}`}
                        color='secondary'
                     />
                  );
               })}
            </CardContent>
         </Card>
      );
   };
   return (
      <div className={classes.body}>
         {pokemon === undefined && <CircularProgress />}
         {pokemon !== undefined && pokemon && generatePokemon(pokemon)}
         {pokemon === false && <Typography> Pokemon not found</Typography>}
         {pokemon !== undefined && (
            <Button
               className={classes.button}
               variant='contained'
               color='primary'
               onClick={() => history.push("/")}
            >
               back to pokedex
            </Button>
         )}
      </div>
   );
};

export default Pokemon;
