import { useState } from "react";
import { test_games } from "../games";

export default function useGame() {
    const [games, setGames] = useState(test_games)

    const default_game = {
        "name": "N/A",
        "card": test_games[2].card,
        "desc": test_games[2].desc,
        "cover": test_games[2].cover,
        "year": test_games[2].year
    }


    function changeSearchedGames(new_games) {
        let next_games = []

        Object.values(new_games).map((game, index) => {
            let year = new Date(game.first_release_date * 1000).getFullYear()

            next_games.push({
                "id": index,
                "name": game.name ? game.name : default_game.name,
                "card": game.cover ? game.cover.url : default_game.card,
                "desc": game.summary ? game.summary : default_game.desc,
                "cover": game.screenshots ? game.screenshots[0].url : default_game.cover,
                "year": year ? year : default_game.year
            })

            return next_games
        })

        console.log(next_games)

        setGames(next_games)
        return true
    }

    return {games: games, changeSearchedGames: changeSearchedGames}
}