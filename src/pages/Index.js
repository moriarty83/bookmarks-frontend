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
        setNewForm({ ...newForm, [event.target.name]: event.target.value });
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
        return props.bookmarks.map((bookmark, index) =>{
            const cssProperties = {}
            cssProperties['--i'] = index;
            cssProperties['--zindex'] = props.bookmarks.length - index;
        return(
            <div key={bookmark._id} className="bookmark" style={cssProperties}>
                <Link to={`bookmarks/${bookmark._id}`}><h1>{bookmark.title}</h1></Link>
                <h2>{bookmark.url}</h2>
            </div>
        )});
    };

    const loading = () => {
        return <h1>Loading...</h1>;
    };


    return (
        <container>
            <section>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Add Bookmark</legend>
                    <input required
                        type="text"
                        value={newForm.title}
                        name="title"
                        placeholder="title"
                        onChange={handleChange}
                    />
                    <input required
                        type="text"
                        value={newForm.url}
                        name="url"
                        placeholder="Bookmark URL"
                        onChange={handleChange}
                    />
                    <input type="submit" value="Add a Bookmark" />
                    </fieldset>
                </form>
            </section>
                <section>
                               <div class="bookmark-container">
                    {props.bookmarks ? loaded() : loading ()}
                </div>
                </section>
            </container>
    );
}

export default Index;