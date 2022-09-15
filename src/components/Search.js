import SearchCard from "./SearchCard";
import ck3_card from "../images/ck3_card.jpg";
import lego_potc from "../images/lego_POTC_card.jpg";
import sekiro_card from "../images/sekiro_card.jpg";
import minecraft_card from "../images/minecraft_card.png";
import "../css/Search.css"

export default function Search() {
    return (
        <>
        <div className="search-bar">
            <input placeholder="Search..." type="search" autoComplete="off" className="search-input"  />
            <div className="search-dvd"></div>
            <button className="search-btn" onClick={() => alert("Button clicked")} />
        </div>

        <div className="card-container">
            <SearchCard game={{"name": "CK3", "img": ck3_card}} />
            <SearchCard game={{"name": "Lego POTC", "img": lego_potc}} />
            <SearchCard game={{"name": "Sekiro", "img": sekiro_card}} />
            <SearchCard game={{"name": "Minecraft", "img": minecraft_card}} />
        </div>

        </>
    )
}