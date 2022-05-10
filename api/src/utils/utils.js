const axios = require("axios");
const { Pokemon, Types } = require("../db")
// const url = 'https://pokeapi.co/api/v2/pokemon' ;

const getPokesApi= async ()=>{
    try {
        let pokeArreglo=[];
        const pokeApi = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40')
        let pokeInfo = pokeApi.data.results.map( p => axios.get(p.url))
        
        let pokeResults = axios.all(pokeInfo).then( poke => {
            poke.map( p => {
                pokeArreglo.push({
                    id: p.data.id,
                    name: p.data.name,
                    hp: p.data.stats[0].base_stat,
                    attack: p.data.stats[1].base_stat,
                    defense: p.data.stats[2].base_stat,
                    speed: p.data.stats[5].base_stat,
                    height: p.data.height,
                    weight: p.data.weight,
                    types: p.data.types.map(t=>t.type.name),
                    img: p.data.sprites.other.home.front_default,

                    // img:"official-artwork": {
                    // "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
                })
            })
            return pokeArreglo;
        })
        return pokeResults
    } catch (error) {
        console.log(error)
    }
};


const getPokesDB = async ()=>{
    const pokesDB = await Pokemon.findAll({
        include:Types
    })
    return pokesDB
}


const getAllPokes = async ()=>{
    const pokeApi = await getPokesApi();
    const pokeDB = await getPokesDB()
    const allPokes = [...pokeApi, ...pokeDB]
    return allPokes;
}



const loadingPokesDB= async ()=>{
    try{
        let pokeArray =[];
        await axios.get('https://pokeapi.co/api/v2/type').then(pokeTypes=>pokeTypes.data.results.map(t=>pokeArray.push({name:t.name})));
        const pokeTypes = await Types.findAll();
        if(pokeTypes.length===0){
            await Types.bulkCreate(pokeArray)
        }
        }catch(error){console.log(error)}    

}

module.exports={
    getPokesApi, 
    getPokesDB,
    getAllPokes,
    loadingPokesDB
}