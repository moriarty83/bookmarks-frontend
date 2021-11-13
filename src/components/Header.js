import { Link } from "react-router-dom"

function Header(props) {
    return (
        <nav className="nav">
            <Link to = "/">
                <h1>Fighting</h1>
                <img className="nav-img" src="/images/mongoose.png" alt="logo"/>
                <h1>Bookmarks</h1>
            </Link>
        </nav>
    )
}

export default Header;