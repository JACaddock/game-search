import SearchCard from "./SearchCard";
import { useCallback, useEffect, useRef, useState } from "react";
import "../css/Search.css";
import useGame from "../hooks/useGame";
import { useSelector, useDispatch } from "react-redux";
import { authenticate, accessToken } from "../state/auth/authSlice";
import { clickPage, backPage, selectPage } from "../state/page/pageSlice";
import axios from "axios";



export default function Search() {
    const [search, setSearch] = useState("");
    const searchTimeoutRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const {games, changeSearchedGames} = useGame();

    const [pressed, setPressed] = useState(false);

    const keyRef = useRef(handleBackKey);
    const authRef = useRef(false);

    const token = useSelector(accessToken);
    const page = useSelector(selectPage);
    const dispatch = useDispatch();


    function getContent() {
        if (loading) {
            return (
                <h2>Loading...</h2>
            )
        }

        if (page >= 0) {
            return (
                <div className="container">
                    <img className="container-image" src={games[page].cover} alt={games[page].name} />
                    <h2>{games[page].name}</h2>
                    <p>{games[page].desc}</p>
                    <p>{games[page].year}</p>
                </div>
                
                )

        } else {
            return (
                <div className="card-container">
                    {games.map((g)=> {
                        if(g.name.toLowerCase().includes(search.toLowerCase()) || search === "") {
                            return <div key={g.id} onClick={() => dispatch(clickPage(g.id))} onKeyDown={(s) => handleGameSelect(s, g)}><SearchCard game={g} /></div>
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
            dispatch(clickPage(g.id))
        }
    }

    function handleBackKey(e) {
        if(e.key === "Backspace") {
            dispatch(backPage())
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

    
    const authenticateCallback = useCallback(async () => {
        if (token) {
            return true
        } else {
            setLoading(true)
            await axios.post("https://id.twitch.tv/oauth2/token?client_id="+process.env.REACT_APP_CLIENT_ID+"&client_secret="+process.env.REACT_APP_CLIENT_SECRET+"&grant_type=client_credentials")
            .then(function(res) {
                dispatch(authenticate(res.data))
                setLoading(false)
            })
        }
    },[dispatch, token])


    useEffect(() => {
        if (!authRef.current) {
            authenticateCallback()
        }
        
        return () => {
            authRef.current = true
        }
    },[authenticateCallback])


    useEffect(() => {
        searchTimeoutRef.current = setTimeout(() => {
            console.log(search)
        }, 300)

        return () => {
            clearTimeout(searchTimeoutRef.current)
        }
    }, [search])


    async function searchGames() {
        if (token) {
            await axios({
                url: "https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games",
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': process.env.REACT_APP_CLIENT_ID, 
                    'Authorization': "Bearer " + token.access_token
                },
                data: "fields alternative_names,category,cover.url,artworks.url,screenshots.url,collection,first_release_date,genres,keywords,name,screenshots,storyline,summary,tags,themes,websites; where first_release_date > 1262304000; limit 30;"
            })
            .then(res => {
                console.log(res.data)

                changeSearchedGames(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }


    return (
        <div className="main">
            <div className="search-bar">
                <input placeholder="Search..." type="search" autoComplete="off" className="search-input" onInput={handleSearchInput}  />
                <div className="search-dvd"></div>
                <button className="search-btn" onClick={() => alert("Clicked!")} />
            </div>

            { !pressed && <button className="btn" onClick={() => {searchGames(); setPressed(true)}}>Search</button>}

            {getContent()}

        </div>
    )
}