import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { allTypes, createPoke, getPokeByID, updatePoke } from "../../Actions";
import { useHistory, useParams } from "react-router-dom"

//Styles
import Style from "./CreatePokemon.module.css"
import professorOak from "../images/profesorOakk.png"

export default function CreatePokemon(){
    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams();
    
    const myTypes = useSelector(state=>state.pokeTypes)
    const [typs, setTyps] = useState([])

    //UPDATE
    const [updated, setUpdated] = useState(false)
    const pokeToUpdate = useSelector(state=>state.pokeDetailCopy)
    useEffect(()=>{
        dispatch(allTypes())
        id && dispatch(getPokeByID(id))
    },[dispatch, id])
    
    const [input, setInput]=useState({
        name:"",
        hp:"",
        weight:"",
        height:"",
        speed:"",
        defense:"",
        attack:"",
        img:"",
        types:[]
    });
    const [error, setError] = useState({
        name:"",
        hp:"",
        weight:"",
        height:"",
        speed:"",
        defense:"",
        attack:"" 
    })
    
    //SET STATE UPDATE

    
    var count=1;
    // FUNCTION VALIDATE

    function validate(state){
        const errors = {};
        if(!state.name){
            errors.name = "Name is required";
        }else if(!/^[a-zA-Z]{3,10}$/.test(state.name)){
            errors.name = "The name must have from 3 to 10 characters. And they can only be letters";
        }
        if(!state.hp){
            errors.hp = "Hp is required";
        }else if(!/^[0-9]{1,2}$/.test(state.hp)){
            errors.hp = "The hp can only contain values from 0 to 99. And only numbers are allowed"
        }
        if(!state.weight){
            errors.weight = "Weight is required";
        }else if(!/^[0-9]{1,2}$/.test(state.weight)){
            errors.weight = "The weight can only contain values from 0 to 99. And only numbers are allowed"
        }
        if(!state.height){
            errors.height = "Height is required";
        }else if(!/^[0-9]{1,2}$/.test(state.height)){
            errors.height = "The height can only contain values from 0 to 99. And only numbers are allowed"
        }
        if(!state.speed){
            errors.speed = "Speed is required";
        }else if(!/^[0-9]{1,2}$/.test(state.speed)){
            errors.speed = "The speed can only contain values from 0 to 99. And only numbers are allowed"
        }
        if(!state.defense){
            errors.defense = "Defense is required";
        }else if(!/^[0-9]{1,2}$/.test(state.defense)){
            errors.defense = "The defense can only contain values from 0 to 99. And only numbers are allowed"
        }
        if(!state.attack){
            errors.attack = "Attack is required";
        }else if(!/^[0-9]{1,2}$/.test(state.attack)){
            errors.attack = "The attack can only contain values from 0 to 99. And only numbers are allowed"
        }
        
        return errors;
    }

    const handleDltType=(e)=>{
        e.preventDefault();
        if(typs.length>0){
            typs.pop()
        }
        setInput({
            ...input,
            types: typs
        })
    }

    const handleChange2=(e)=>{
        e.preventDefault();
        console.log(e.target.value)
        setInput(prevState=>{
            const newState={
            ...prevState,
            [e.target.name]:e.target.value
            };
            setError(validate(newState))

            return newState
        })
    }

    const handleTypes=(e)=>{
        e.preventDefault();
        if(typs.length===2){alert("Your poke can only have 2 types as max")}
        else if(typs.length<2){
            typs.push(e.target.value)
        }
        setInput({
            ...input,
            types:typs
        })
        
    }

    const handleUpdate=(e)=>{
        e.preventDefault();

        setError(validate(input))
        if(Object.keys(error).length===0 && input.types.length!==0){
        dispatch(updatePoke(id, input))
        setInput({
            name:"",
            hp:"",
            weight:"",
            height:"",
            speed:"",
            defense:"",
            attack:"",   
            img:"",
            types:[]
        })
        alert("poke updateado")
        history.push("/home")
        }else if(input.types.length===0){
            alert("Your pokemon need at least one type")
            return;
        }
        else{
            return;
        }
    }

    const handleSubmit2=(e)=>{
        e.preventDefault();
        
        setError(validate(input))
        if(Object.keys(error).length===0 && input.types.length!==0){
        dispatch(createPoke(input))
        setInput({
            name:"",
            hp:"",
            weight:"",
            height:"",
            speed:"",
            defense:"",
            attack:"",   
            img:"",
            types:[]
        })
        alert("Pokemon succesfully created")
        history.push("/home")
        }else if(input.types.length===0){
            alert("Your pokemon need at least one type")
            return;
        }
        else{
            return;
        }
    }
    if(id && pokeToUpdate.length && !updated){
        let oldArray = []
        oldArray.push(pokeToUpdate[0].types[0].name)
        if(pokeToUpdate[0].types.length===2){
            oldArray.push(pokeToUpdate[0].types[1].name)
        }
        setTyps(oldArray)
        console.log(oldArray)
    setInput({
        ...input,
        name: pokeToUpdate[0].name,
        hp: parseInt(pokeToUpdate[0].hp),
        weight: parseInt(pokeToUpdate[0].weight),
        height: parseInt(pokeToUpdate[0].height),
        speed: parseInt(pokeToUpdate[0].speed),
        defense: parseInt(pokeToUpdate[0].defense),
        attack: parseInt(pokeToUpdate[0].attack),
        img: pokeToUpdate[0].img,
        types: oldArray
        })
    setUpdated(true)
    }
    return(
        <div className={Style.backimg}>
        <div className={Style.title}>Create your Pokemon</div>
            
        <form className={Style.forms}>
            <label>Name</label>
            <input type="text" placeholder="Enter pokemon name" name={"name"} onChange={(e)=>handleChange2(e)} value={input.name} className={Style.inputs}/>
            {error.name && <p className={Style.danger}>{error.name}</p>}
            <label>Hp</label>
            <input type="text" placeholder="Enter pokemon hp" name={"hp"} onChange={(e)=>handleChange2(e)} value={input.hp} className={Style.inputs}/>
            {error.hp && <p className={Style.danger}>{error.hp}</p>}
            <label>Weight</label>
            <input type="text" placeholder="Enter pokemon weight" name={"weight"} onChange={(e)=>handleChange2(e)} value={input.weight} className={Style.inputs}/>
            {error.weight && <p className={Style.danger}>{error.weight}</p>}
            <label>Height</label>
            <input type="text" placeholder="Enter pokemon height" name={"height"} onChange={(e)=>handleChange2(e)} value={input.height} className={Style.inputs}/>
            {error.height && <p className={Style.danger}>{error.height}</p>}
            <label>Speed</label>
            <input type="text" placeholder="Enter pokemon speed" name={"speed"} onChange={(e)=>handleChange2(e)} value={input.speed} className={Style.inputs}/>
            {error.speed && <p className={Style.danger}>{error.speed}</p>}
            <label>Defense</label>
            <input type="text" placeholder="Enter pokemon defense" name={"defense"} onChange={(e)=>handleChange2(e)} value={input.defense} className={Style.inputs}/>
            {error.defense && <p className={Style.danger}>{error.defense}</p>}
            <label>Attack</label>
            <input type="text" placeholder="Enter pokemon attack" name={"attack"} onChange={(e)=>handleChange2(e)} value={input.attack} className={Style.inputs}/>
            {error.attack && <p className={Style.danger}>{error.attack}</p>}
            <label>Image</label>
            <input type="text" placeholder="Enter the url of the image" name={"img"} onChange={(e)=>handleChange2(e)} value={input.img} className={Style.inputs}/>
            <label>Types</label>
            
            
            <select onChange={(e)=>handleTypes(e)}>
                <option>Chose the types</option>
                {myTypes && myTypes.map(type=>{
                
                return(<option value={type.name} key={type.id}>{type.name}</option>)
                
                })
            }
            </select>
            <div>Here's the types of your poke</div>
            <button onClick={(e)=>handleDltType(e)}  className={Style.buttom}>Delete types</button>
            <ul>
            
                
                {
                input.types?.map(tps=>{
                    count=1+count;
                    return(
                        <p key={tps+count} className={Style.texttt}>{tps}</p> 
                    )
                })
                }
            
            </ul>
            {id && id.length>3
            ?<input type="submit" placeholder="Update Pokemon" onClick={(e)=>handleUpdate(e)} value="Update Poke" className={Style.buttom}/>
            :<input type="submit" placeholder="Create Pokemon" onClick={(e)=>handleSubmit2(e)} value="Create Poke" className={Style.buttom}/>
            }
           
            
        </form>
        <div>
        <div className={Style.pstyle}>You can complete this form, and then you will see your poke in the home page</div>
        <img src={professorOak} alt="profesorOak" className={Style.image}/>
        </div>
        
        </div>
    )
}