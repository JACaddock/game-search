import SearchCard from "./SearchCard";
import ck3_card from "../images/ck3_card.jpg";
import lego_potc from "../images/lego_POTC_card.jpg";
import sekiro_card from "../images/sekiro_card.jpg";
import minecraft_card from "../images/minecraft_card.png";
import elden_card from "../images/elden_ring_card.jpg";
import lego_star from "../images/lego_Star_Wars_card.jpg";
import sky_card from "../images/skyrim_card.png";
import tww3_card from "../images/TWW3_card.jpg";
import { useState } from "react";
import "../css/Search.css"

export default function Search() {
    const [game, setGame] = useState("");

    function getContent(g) {
        if (g) {
            return (<p>{g}</p>)
        } else {
            return (
                <div className="card-container">
                    <div onClick={() => setGame("CK3")}><SearchCard game={{"name": "CK3", "img": ck3_card}} /></div>
                    <div onClick={() => setGame("Lego POTC")}><SearchCard game={{"name": "Lego POTC", "img": lego_potc}} /></div>
                    <div onClick={() => setGame("Sekiro")}><SearchCard game={{"name": "Sekiro", "img": sekiro_card}} /></div>
                    <div onClick={() => setGame("Minecraft")}><SearchCard game={{"name": "Minecraft", "img": minecraft_card}} /></div>
                    <div onClick={() => setGame("TWW3")}><SearchCard game={{"name": "TWW3", "img": tww3_card}} /></div>
                    <div onClick={() => setGame("Elden Ring")}><SearchCard game={{"name": "Elden Ring", "img": elden_card}} /></div>
                    <div onClick={() => setGame("Lego Star Wars")}><SearchCard game={{"name": "Sekiro", "img": lego_star}} /></div>
                    <div onClick={() => setGame("Skyrim")}><SearchCard game={{"name": "Skyrim", "img": sky_card}} /></div>
                </div>
            )
        }
    }



    return (
        <>
        <div className="search-bar">
            <input placeholder="Search..." type="search" autoComplete="off" className="search-input"  />
            <div className="search-dvd"></div>
            <button className="search-btn" onClick={() => alert("Button clicked")} />
        </div>

        {getContent(game)}

        </>
    )
}