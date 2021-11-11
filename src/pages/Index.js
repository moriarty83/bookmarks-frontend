import { useState } from "react";
import {Link} from "react-router-dom"

function Index(props) {
    // state to hold formData
    const [newForm, setNewForm] = useState({
        title: "",
        url: "",
    });

    // handleChange function for form
    const handleChange = (event) => {
        setNewForm({ ...newForm, [event.target.title]: event.target.value });
    };

    // handle submit function for form
    const handleSubmit = (event) => {
        event.preventDefault();
        props.createBookmarks(newForm);
        setNewForm({
            title: "",
            url: "",
        });
    };

    // loaded function
    const loaded = () => {
        return props.bookmarks.map((bookmark) => (
            <div key={bookmark._id} className="bookmark">
                <Link to={`bookmarks/${bookmark._id}`}><h1>{bookmark.title}</h1></Link>
                <h2>{bookmark.url}</h2>
            </div>
        ));
    };

    const loading = () => {
        return <h1>Loading...</h1>;
    };
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newForm.title}
                    name="title"
                    placeholder="title"
                    onChange={handleSubmit}
                />
                <input
                    type="text"
                    value={newForm.url}
                    name="url"
                    placeholder="Bookmark URL"
                    onChange={handleChange}
                />
                <input type="submit" value="Add a Bookmark" />
            </form>
            {props.bookmarks ? loaded() : loading ()}
        </section>
    );
}

export default Index;