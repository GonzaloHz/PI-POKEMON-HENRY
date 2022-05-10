import React from "react";
import { useHistory } from "react-router-dom"

//Styles
import Style from "./About.module.css"
import linkedinLogo from "../images/linkedinlogo.webp"
import mailLogo from "../images/hotmailogo.jpg"
import githubLogo from "../images/githublogo.png"

export default function About(){
    const history= useHistory();
    const handleBack=()=>{
        history.push("/home")
    }

    return(
        <div className={Style.backgroudimg}>
            <div className={Style.buttomdiv}>
            <button onClick={()=>handleBack()} className={Style.buttom}>BACK TO HOME</button>
            </div>
            <div>
            <h1 className={Style.texth1}>About me</h1>
            <p className={Style.textp}>Hi, I'm Gonzalo and I'm the creator of this App.</p>
            <p>I've made this as my individual project</p>
            <p>When  was studying in Henry's bootcamp.</p>
            <p>It was made totally by me, meaning</p>
            <p>I developed both backend and frontend.</p>
            <p>If you are interested in my skills, you can</p>
            <p>contact me, through any of my social media</p>
            </div>
            <div className={Style.pkcdiv}>
                
            <div className={Style.pkc}/>    
            </div>
            
            <div className={Style.orderdiv}>
            <img src={mailLogo} alt="hotmail" className={Style.hotmaillogo}/>
            <a rel="noreferrer" href="https://www.linkedin.com/in/gonzalo-hernandez-8161b9237/" target="_blank">
                <img src={linkedinLogo} alt="linkedin" className={Style.linkedinlogo}/>
            </a>
            <a rel="noreferrer" href="https://github.com/gxwgonza" target="_blank">
                <img src={githubLogo} alt="github" className={Style.githublogo}/>
            </a>
            </div>
            <div>E-MAIL: gonzalo.hernandez1@hotmail.com</div>
        </div>
    )
}