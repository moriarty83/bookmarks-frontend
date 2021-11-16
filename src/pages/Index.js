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
        const bookmarkElements = props.bookmarks.map((bookmark, index) =>{
            let cardClass = 'blue-index'
            switch(index % 5){
                case 0: 
                cardClass = 'blue-index'
                break

                case 1: 
                cardClass = 'green-index'
                break

                case 2: 
                cardClass = 'pink-index'
                break

                case 3: 
                cardClass = 'purple-index'
                break

                case 4: 
                cardClass = 'yellow-index'
                break

                default:
                    cardClass = 'blue-index'
            }
            
            const cssProperties = {}
            cssProperties['--i'] = +index;
            cssProperties['--zindex'] = props.bookmarks.length - index;
            // cssProperties['--bg-image-yellow'];
            
            
        return(
            <div key={bookmark._id} className={"bookmark "+cardClass}  style={cssProperties}>
                <h1><a href={bookmark.url} target="_blank" rel="noreferrer">{bookmark.title}</a></h1>
                <h2>{bookmark.url}</h2>
                <Link to={`bookmarks/${bookmark._id}`}><button>View Bookmark</button></Link>
            </div>
        )});
        
        const cssProperties={};
        cssProperties['--arr-length']= bookmarkElements.length;
        return(
            <div className="bookmark-container" style={cssProperties}>
                {bookmarkElements}
            </div>
        )
    };
    
    
    const loading = () => {
        return <h1>Loading...</h1>;
    };


    return (
        <div className="container">
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
                    {props.bookmarks ? loaded() : loading ()}
                
                </section>
            </div>
    );
}

export default Index;