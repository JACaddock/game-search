import { useState } from "react";
import { test_games, placeholder_game } from "../games";

export default function useGame() {
    const [games, setGames] = useState(test_games)

    const default_game = placeholder_game;


    function changeSearchedGames(new_games) {
        let next_games = []

        Object.values(new_games).map((game, index) => {
            let year = new Date(game.first_release_date * 1000).getFullYear();
            
            let card = game.cover ? "//images.igdb.com/igdb/image/upload/t_cover_big/" + game.cover.image_id + ".jpg" : default_game.card;
            let cover = game.artworks ? "//images.igdb.com/igdb/image/upload/t_screenshot_huge/" + game.artworks[0].image_id + ".jpg" : default_game.cover;


            next_games.push({
                "id": index,
                "name": game.name ? game.name : default_game.name,
                "card": card,
                "desc": game.summary ? game.summary : default_game.desc,
                "cover": cover,
                "year": year ? year : default_game.year
            })

            return next_games
        })

        setGames(next_games)
        return true
    }

    return {games: games, changeSearchedGames: changeSearchedGames}
}