import { Link } from "react-router-dom";
import pokemon from  "../images/pokemontitle.png"


import Styles from "./LandingPage.module.css"
export default function LandingPage(){
    return(
        <div className={Styles.bgimage}>
            <div>
                <Link to="/home">
                    <img src={pokemon} alt="title" className={Styles.title}/>
                    <div className={Styles.frase}>Gotta catch 'em all!</div>
                </Link>
            </div>
        </div>
    )
}