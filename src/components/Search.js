import SearchCard from "./SearchCard";
import ck3_card from "../images/ck3_card.jpg";
import lego_potc from "../images/lego_POTC_card.jpg";
import sekiro_card from "../images/sekiro_card.jpg";
import minecraft_card from "../images/minecraft_card.png";

export default function Search() {
    return (
        <>
        <div>
            <label>Search Bar</label>
            <input placeholder="Search..." type="search" autoComplete="off" />
            <button>Search</button>
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