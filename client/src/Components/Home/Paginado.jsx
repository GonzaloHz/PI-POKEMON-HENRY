import React from "react";

//Styles
import Style from "./Paginado.module.css"


export default function Paginado({pokemonsPerPage, allPokemons, paginado}){
    const pageNumber=[];
    for(let i=1; i<=Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumber.push(i)
    }

    return(
        <nav>
            <ul className={Style.text}>
                {pageNumber &&
                pageNumber.map(number=>(
                    <li key={number} className={Style.page}>
                        <a onClick={()=>paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}