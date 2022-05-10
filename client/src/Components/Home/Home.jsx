import { Link } from "react-router-dom";
import React,{ useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPoke, getPokemons, orderByAttack, orderByName, orderByType, resetDetail, searchPoke } from "../../Actions";
import Pokemon from "../PokemonCard/Pokemon";
import psyduck from  "../images/PSYDUCKIDO.webp"
import Paginado from "./Paginado";
import snorlax from "../images/SNORLAXSLEEP.jpg"

//Styles
import Style from "./Home.module.css"
import title from  "../images/pokemontitle.png"


export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector((state)=>state.pokemonCopy);
    const [input, setInput] = useState("");

    
    const [, setReloadUsers] = useState(false)

    //PAGINADO
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, ] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemon = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    
    useEffect(()=>{
        dispatch(getPokemons())
        dispatch(resetDetail())
    },[dispatch])

    console.log(allPokemons)

    const handleChange=(e)=>{
        setInput(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(searchPoke(input))
        setInput("")
        setCurrentPage(1)
        setReloadUsers((prevState) => !prevState);
    }
    const handleFilterByCreation=(e)=>{
        e.preventDefault();
        dispatch(filterPoke(e.target.value))
        setReloadUsers((prevState) => !prevState);
        setCurrentPage(1)
    }
    const handleFilterByType=(e)=>{
        e.preventDefault();
        dispatch(orderByType(e.target.value))
        setReloadUsers((prevState) => !prevState);
        setCurrentPage(1)
    }
    const handleOrderByAttack=(e)=>{
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
        setReloadUsers((prevState) => !prevState);
        setCurrentPage(1)
    }
    const handleOrderByName=(e)=>{
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setReloadUsers((prevState) => !prevState)
        setCurrentPage(1)
    }
    return(
    <div className={Style.background}>
        <div className={Style.textStyle}>
        <img src={title} alt="pokemon" className={Style.title}/>
        <><Link to="" className={Style.lists}>Landing Page</Link></>        
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className={Style.searchBar}>
            <input type="text" placeholder="Search your poke" onChange={(e)=>handleChange(e)} value={input} className={Style.input1}/>
            <input type="submit"value="Search" className={Style.input2}/>
            </div>
        </form>
        <><Link to="/createPokemon" className={Style.lists}>Create Pokemon</Link></>
        <><Link to="/about" className={Style.lists}>About me</Link></>
        </div>
        
        <div className={Style.filters}>
        <p>
            <select onChange={(e)=>handleFilterByCreation(e)}>
                <option>Filter by origin</option>
                <option value="weCreate">We Create</option>
                <option value="apiCreate">Api Create</option>
            </select>
        </p>
        <p>
            <select onChange={(e)=>handleFilterByType(e)}>
                <option>Filter by types</option>
                <option value="normal">Normal</option>
                <option value="fighting">Fighting</option>
                <option value="flying">Flying</option>
                <option value="poison">Poison</option>
                <option value="ground">Ground</option>
                <option value="rock">Rock</option>
                <option value="bug">Bug</option>
                <option value="ghost">Ghost</option>
                <option value="steel">Steel</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="grass">Grass</option>
                <option value="electric">Electric</option>
                <option value="psychic">Psychic</option>
                <option value="ice">Ice</option>
                <option value="dragon">Dragon</option>
                <option value="dark">Dark</option>
                <option value="fairy">Fairy</option>
                <option value="unknown">Unknown</option>
                <option value="shadow">Shadow</option>
            </select>
        </p>        
        <p>
            <select onChange={(e)=>handleOrderByAttack(e)}>
            <option>Order by attack</option>
                <option value="attackAscending">By highest attack</option>
                <option value="attackDescending">By lowest attack</option>
            </select>
        </p>
        <p>
            <select onChange={(e)=>handleOrderByName(e)}>
                <option>Order by name</option>
                <option value="alphabet">A - Z</option>
                <option value="notAlphabet">Z - A</option>
            </select>
        </p>
        </div>
        <Paginado pokemonsPerPage = {pokemonsPerPage} allPokemons = {allPokemons.length} paginado = {paginado}/>

        <div className={Style.orderP}>
        {currentPokemon.length?
        typeof currentPokemon[0]==="object"? 
        currentPokemon.map( p => {
            return(
            <Pokemon key={p.id+5000} name={p.name} id={p.id} types={p.types} img={p.img} createdInDb={p.createdInDb}/>
            )}):
            <img src={snorlax} alt="snorlax"/>: 
            <div className={Style.loader}>
            <p>Loading Pokemons... Maybe I cant encounter the pokemons:c</p>
            <img src={psyduck} alt="loading.gif"/>
            </div> 
            }
        </div>            
        
        <Paginado pokemonsPerPage = {pokemonsPerPage} allPokemons = {allPokemons.length} paginado = {paginado}/>
    </div>
    )
    
}