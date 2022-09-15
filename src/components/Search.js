import SearchCard from "./SearchCard";
import ck3_card from "../images/ck3_card.jpg";
import lego_potc from "../images/lego_POTC_card.jpg";
import sekiro_card from "../images/sekiro_card.jpg";
import minecraft_card from "../images/minecraft_card.png";
import elden_card from "../images/elden_ring_card.jpg";
import lego_star from "../images/lego_Star_Wars_card.jpg";
import sky_card from "../images/skyrim_card.png";
import tww3_card from "../images/TWW3_card.jpg";
import tww3_cover from "../images/TWW3_cover.jpg"
import { useState } from "react";
import "../css/Search.css"

export default function Search() {
    const [game, setGame] = useState("");

    const test_game = {
        "name": "Total War Warhammer III",
        "card": tww3_card,
        "cover": tww3_cover,
        "desc": `Total War: Warhammer III is a turn-based strategy and real-time tactics video game 
                developed by Creative Assembly and published by Sega. It is part of the Total War series, 
                and the third to be set in Games Workshop's Warhammer Fantasy fictional universe.`
    }

    function getContent(g) {
        if (g) {
            return (
                <div className="container">
                    <img className="container-image" src={g.cover} alt={g.name} />
                    <h2>{g.name}</h2>
                    <p>{g.desc}</p>
                </div>
                
                )

        } else {
            return (
                <div className="card-container">
                    <div onClick={() => setGame(test_game)}><SearchCard game={{"name": "CK3", "img": ck3_card}} /></div>
                    <div onClick={() => setGame(test_game)}><SearchCard game={{"name": "Lego POTC", "img": lego_potc}} /></div>
                    <div onClick={() => setGame(test_game)}><SearchCard game={{"name": "Sekiro", "img": sekiro_card}} /></div>
                    <div onClick={() => setGame(test_game)}><SearchCard game={{"name": "Minecraft", "img": minecraft_card}} /></div>
                    <div onClick={() => setGame(test_game)}><SearchCard game={{"name": "TWW3", "img": tww3_card}} /></div>
                    <div onClick={() => setGame(test_game)}><SearchCard game={{"name": "Elden Ring", "img": elden_card}} /></div>
                    <div onClick={() => setGame(test_game)}><SearchCard game={{"name": "Sekiro", "img": lego_star}} /></div>
                    <div onClick={() => setGame(test_game)}><SearchCard game={{"name": "Skyrim", "img": sky_card}} /></div>
                </div>
            )
        }
    }



    return (
        <div className="main">
            <div className="search-bar">
                <input placeholder="Search..." type="search" autoComplete="off" className="search-input"  />
                <div className="search-dvd"></div>
                <button className="search-btn" onClick={() => {
                    alert("Button clicked");
                    setGame("");
                    }} />
            </div>

            {getContent(game)}

        </div>
    )
}