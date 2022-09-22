import { backPage } from "../state/page/pageSlice"
import { useDispatch } from "react-redux"

export default function Navbar() {
    const dispatch = useDispatch();

    return (
    <nav>
        <h1 className="font-semibold link" onClick={() => dispatch(backPage())}>Game Search App</h1>
    </nav>
    )
}