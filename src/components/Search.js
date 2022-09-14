import SearchCard from "./SearchCard"

export default function Search() {
    const game = {
        "title": "Game 1",
        "short": "This is a game",
        "year": "2012",
        "desc": "This is a game about stuff"
    }

    return (
        <>
        <div>
            <label>Search Bar</label>
            <input placeholder="Search..." type="search" autoComplete="off" />
            <button>Search</button>
        </div>

        <div className="card-container">
            <SearchCard game={game} />
            <SearchCard game={game} />
            <SearchCard game={game} />
            <SearchCard game={game} />
        </div>

        </>
    )
}