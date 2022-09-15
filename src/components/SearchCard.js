export default function SearchCard({game}) {
    return (
        <div className="card">
            <img src={game.card} alt={game.name + " card.jpg"} className="card-image" /> 
        </div>
    )
}