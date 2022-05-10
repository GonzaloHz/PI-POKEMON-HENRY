import { ALL_PTYPES, CREATE_POKE, DELETE_POKE, FILTER_BY_ID, FILTER_POKE, GET_ALLPOKES, ORDER_BY_ATTACK, ORDER_BY_NAME, ORDER_BY_TYPE, RESET_DETAIL, SEARCH_POKE, UPDATE_POKE } from "../Actions/actionTypes";

const initialState ={
    pokemons:[], // estado???
    pokeDetail:[], // para todos los stats de los pokes
    pokemonCopy:[], // estado que se modifica con el useSelector
    filteredPoke:[], // estado que no se modifica
    pokeDetailCopy:[],
    pokeTypes:[]
}

export default function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_ALLPOKES : return{
            ...state,
            pokemons: action.paylod,
            pokemonCopy: action.payload,
            filteredPoke: action.payload,
            filteredByType: action.payload,
            filteredByAttack: action.payload
        }
        case SEARCH_POKE :
            console.log(action.payload)
            let alotPokes = state.filteredPoke
            if(alotPokes){console.log("YESSS")}
            let onePoke = alotPokes.filter(p=>p.name===action.payload.toLowerCase())
            let dontPoke = alotPokes
            if(action.payload===""){
                alert("Please write a name to search a poke")
            }
            else if(onePoke.length===0){alert("No pokes with that name, let me show you all the pokemons")}
            if(onePoke.length>0){console.log('ES TRUE!!!!')}
            return{
            ...state,
            pokemonCopy: onePoke.length>0? onePoke: dontPoke
        }
        case FILTER_POKE : 
        let allPokes = state.filteredPoke
        let createdFilter=[];
        console.log(allPokes)
        if(action.payload==="weCreate"){
            createdFilter = allPokes.filter(p=>p.createdInDb)
        }
        console.log(allPokes)
        if(action.payload==="apiCreate"){
            createdFilter = allPokes.filter(p=>!p.createdInDb)
        }
        return{
            ...state,
            pokemonCopy:createdFilter
        }
        case ORDER_BY_TYPE : 
        let allPokes2 = state.filteredByType
        let createdFilter2 = [];
        let createdFilter3 = [];
        createdFilter2 = allPokes2.filter(p=>p.types[0]===action.payload)
        createdFilter3 = createdFilter2.concat(allPokes2.filter(p=>p.types[1]===action.payload))
        return{
            ...state,
            pokemonCopy: createdFilter3.length>0? createdFilter3 : allPokes2.concat(alert("NO POKES WITH THAT TYPE"))
        }
        case ORDER_BY_ATTACK : 
        let allPokes3 = state.pokemonCopy
        let orderedPokemons = []
        if(action.payload==="attackDescending"){
        orderedPokemons = allPokes3.sort((a, b) => {
            if (a.attack > b.attack) return 1
            if (a.attack < b.attack) return -1
            return 0
            })  
        }
        if(action.payload==="attackAscending"){
            orderedPokemons = allPokes3.sort((b, a) => {
            if (a.attack > b.attack) return 1
            if (a.attack < b.attack) return -1
            return 0
            })  
        }            
        console.log('aca toy')
        console.log(orderedPokemons)      
        return{
            ...state,
            pokemonCopy: orderedPokemons.length>0? orderedPokemons : allPokes3.concat(alert('HUBO UN PROBLEMAXD'))
        }
        case ORDER_BY_NAME :
        let allPokes4 = state.pokemonCopy;
        let orderPokemons2 = [];
        if(action.payload==="alphabet"){
            orderPokemons2 = allPokes4.sort((a, b)=>{
                if(a.name > b.name) return 1
                if(a.name < b.name) return -1
                return 0
            })
        }
        if(action.payload==="notAlphabet"){
            orderPokemons2 = allPokes4.sort((b, a)=>{
                if(a.name > b.name) return 1
                if(a.name < b.name) return -1
                return 0
            })
        }
        console.log(orderPokemons2)
            return{
                ...state,
                pokemonCopy: orderPokemons2.length>0? orderPokemons2 : allPokes4
            }
        case FILTER_BY_ID :
            console.log(action.payload)
            return{
                ...state,
                pokeDetail: action.payload,
                pokeDetailCopy: action.payload
            }
        case CREATE_POKE :
            return{
                ...state,
                pokemonCopy: state.pokemonCopy.concat(action.payload)
            }
        case DELETE_POKE :
            return{
                ...state,
                pokemonCopy : state.pokemonCopy.filter(p=>p !== action.payload)
            }
        case UPDATE_POKE : //COMPLETAR ACA
            return{
                ...state,
            }
        case RESET_DETAIL :
            const allMyPokes = state.pokemonCopy;
            return{
                ...state,
                pokeDetailCopy:[],
                pokemonCopy: allMyPokes
            }
        case ALL_PTYPES :
            return{
                ...state,
                pokeTypes: action.payload
            }
        default : return state;
    }
}