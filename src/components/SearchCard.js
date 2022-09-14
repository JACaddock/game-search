export default function SearchCard({game}) {
    return (
        <div className="card">
            <h2>{game.title}</h2>
            <h3>{game.short}</h3>
            <h4>{game.year}</h4>
            <p>{game.desc}</p>
            <img src={game.img} alt="Placeholder for future implementation" className="card-img" />  
        </div>
    )
}