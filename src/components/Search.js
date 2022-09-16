import SearchCard from "./SearchCard";
import { useEffect, useRef, useState } from "react";
import "../css/Search.css"
import { games } from "../games"

export default function Search() {
    const [game, setGame] = useState("");
    const [search, setSearch] = useState("");

    const keyRef = useRef(handleBackKey);

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
                    {games.map((g)=> {
                        if(g.name.toLowerCase().includes(search.toLowerCase()) || search === "") {
                            return <div key={g.name} onClick={() => setGame(g)} onKeyDown={(s) => handleGameSelect(s, g)}><SearchCard game={g} /></div>
                        } else {
                            return false
                        }
                    })}
                </div>
            )
        }
    }

    function handleSearchInput(s) {
        setSearch(s.target.value);
    }


    function handleGameSelect(s, g) {
        console.log(s.key)
        if (s.key === "Enter") {
            setGame(g)
        }
    }

    function handleBackKey(e) {
        if(e.key === "Backspace") {
            setGame("");
        }
    }

    useEffect(() => {
        keyRef.current = handleBackKey;
    })


    useEffect(() => {
        const key = (e) => keyRef.current(e)
        
        window.addEventListener("keydown", key)
        
        return () => {
            window.removeEventListener("keydown", key)
        }    
    }, [])


    return (
        <div className="main">
            <div className="search-bar">
                <input placeholder="Search..." type="search" autoComplete="off" className="search-input" onInput={handleSearchInput}  />
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