export default function SearchCard({game}) {
    return (
        <div className="card">
            <img src={game.img} alt="Placeholder for future implementation" className="card-image" onClick={() => alert("Clicked on " + game.name)} /> 
        </div>
    )
}