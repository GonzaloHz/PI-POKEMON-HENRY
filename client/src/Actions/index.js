import axios from "axios";
import { SEARCH_POKE, GET_ALLPOKES, FILTER_POKE, ORDER_BY_TYPE, ORDER_BY_ATTACK, ORDER_BY_NAME, FILTER_BY_ID, CREATE_POKE, DELETE_POKE, RESET_DETAIL, ALL_PTYPES, UPDATE_POKE } from "./actionTypes";

export const getPokemons=()=>{
    return async function(dispatch){
        const pokes = await axios.get("http://localhost:3001/pokemons",{});
        return dispatch({
            type: GET_ALLPOKES, 
            payload: pokes.data
        });
    }
}


export const searchPoke=(payload)=>{
    console.log(payload)
    return{
        type: SEARCH_POKE,
        payload
    }
}
export const filterPoke=(payload)=>{
    return{
        type: FILTER_POKE,
        payload
    }
}   
export const orderByType=(payload)=>{
    return{
        type:ORDER_BY_TYPE,
        payload
    }
}
export const orderByAttack=(payload)=>{
    return{
        type: ORDER_BY_ATTACK,
        payload
    }
}
export const orderByName=(payload)=>{
    return{
        type: ORDER_BY_NAME,
        payload
    }
}
export const getPokeByID=(id)=>{
    return async function(dispatch){
        const myPoke = await axios.get("http://localhost:3001/pokemons/"+id);
        console.log(myPoke)
        return dispatch({
            type: FILTER_BY_ID,
            payload: myPoke.data
        })
    }
    
}
export const resetDetail=()=>{
    return{
        type: RESET_DETAIL
    }
}
export const allTypes=()=>{
    return async function(dispatch){
        const allMyTypes = await axios.get("http://localhost:3001/types")
        return dispatch({
            type:ALL_PTYPES,
            payload:allMyTypes.data
        })
    }
}

// CREATE POKEMON
export const createPoke=(payload)=>{
    return async function(dispatch){
        const newPoke = await axios.post("http://localhost:3001/pokemons", payload)
        return dispatch({
        type: CREATE_POKE,
        payload: newPoke
        })
    }
    
}

// DELETE POKEMON
export const deletePoke=(payload)=>{
    return async function(dispatch){
        const selectPoke = await axios.delete("http://localhost:3001/pokemons/"+ payload)
        return dispatch({
            type: DELETE_POKE,
            payload: selectPoke
        })
    }
}

//UPDATE POKEMON
export const updatePoke=(id, payload)=>{
    return async function(dispatch){
        await axios.put("http://localhost:3001/pokemons/"+id, payload)
        return dispatch({
            type: UPDATE_POKE
        })
    }
}