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
    const focusRef = useRef(null);

    const [filter, setFilter] = useState("");

    const [loading, setLoading] = useState(false);
    const {games, changeSearchedGames} = useGame();

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
                        if(g.name.toLowerCase().includes(filter.toLowerCase()) || filter === "") {
                            return <div key={g.id} onClick={() => dispatch(clickPage(g.id))} onKeyDown={(e) => handleGameSelect(e, g)}><SearchCard game={g} /></div>
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

    function handleFilterInput(s) {
        setFilter(s.target.value);
    }


    function handleGameSelect(e, g) {
        if (e.key === "Enter" || e.key === "Return") {
            dispatch(clickPage(g.id))
        }
    }


    function handleGameSearch(e) {
        if (e.key === "Enter" || e.key === "Return") {
            searchGames(search)
        }
    }

    function handleBackKey(e) {
        if((document.activeElement !== focusRef.current && e.key === "Backspace") || e.key === "Escape") {
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
            //console.log(search)
        }, 300)

        return () => {
            clearTimeout(searchTimeoutRef.current)
        }
    }, [search])


    async function searchGames(query) {
        if (query === undefined || query === "") {
            query = 'where first_release_date > 1262304000 & cover.url != null & rating != null;';
        } else {
            query = 'search "' + query + '"; where category = 0;';
        }

        if (token) {
            await axios({
                url: "https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games",
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': process.env.REACT_APP_CLIENT_ID, 
                    'Authorization': "Bearer " + token.access_token
                },
                data: `fields alternative_names,category,cover.*,artworks.*,screenshots.*,first_release_date,name,summary;`
                       +query+
                       `limit 30;`
            })
            .then(res => {
                changeSearchedGames(res.data)
                setSearch("")
                dispatch(backPage())
            })
            .catch(err => {
                console.log(err)
            })
        }
    }


    return (
        <div className="main">
            <div id="search" className="search-bar">
                <input placeholder="Search..." type="search" autoComplete="off" className="search-input" ref={focusRef} value={search} onInput={handleSearchInput} onKeyDown={handleGameSearch} />
                <div className="search-dvd"></div>
                <button className="search-btn" onClick={() => searchGames(search)} />
            </div>

            {page === -1 && 
                <div id="filter" className="search-bar">
                    <input placeholder="Filter..." type="search" autoComplete="off" className="search-input" onInput={handleFilterInput} />
                </div> 
            }

            {getContent()}

        </div>
    )
}