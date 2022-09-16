import { useRef } from "react";

export default function SearchCard({game}) {
    const focusRef = useRef(null);

    function handleFocus() {
        focusRef.current.focus();
    }

    function handleBlur() {
        focusRef.current.blur()
    }


    return (
        <div className="card" tabIndex="0" ref={focusRef} onMouseEnter={handleFocus} onMouseLeave={handleBlur}>
            <img src={game.card} alt={game.name + " card.jpg"} className="card-image" /> 
        </div>
    )
}