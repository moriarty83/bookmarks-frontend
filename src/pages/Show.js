import { useState } from "react";

function Show(props) {
    // grab the id param from match
    const id = props.match.params.id;
    // save bookmarks standalone variable
    const bookmarks = props.bookmarks;
    // find the bookmark to show
    const bookmark = bookmarks.find((singleBookmark) => {
        return singleBookmark._id === id;
    });

    const bookmarkIndex = bookmarks.findIndex((element)=>{return element._id === id})
    console.log(bookmarkIndex)
  let cardClass = 'blue-index'
    switch(bookmarkIndex % 5){
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
    // state for our form
    const [editForm, setEditForm] = useState(bookmark);

    // handleChange function for form
    const handleChange = (event) => {
        setEditForm({ ...editForm, [event.target.name]: event.target.value });
    };

    // handleSubmit function for from submission
    const handleSubmit = (event) => {
        event.preventDefault()
        props.updateBookmarks(editForm, bookmark._id)
        // redirect to index
        props.history.push("/")
    };

    const removeBookmark = () => {
        props.deleteBookmarks(bookmark._id)
        props.history.push("/")
    };

    return (
        
            <div id="show-index-card">
                <div key={bookmark._id} className={"show-bookmark " + cardClass} >
                    <h1>{bookmark.title}</h1>
                    <h2>{bookmark.url}</h2>
            <div className="form-div">

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={editForm.title}
                    name="title"
                    placeholder="title"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={editForm.url}
                    name="url"
                    placeholder="Bookmark URL"
                    onChange={handleChange}
                />
                <input type="submit" value="Update a Bookmark" />
            </form>

            <button onClick={removeBookmark} id="delete">
                DELETE
            </button>

                </div>
                </div>

            </div>
            
        
    );
};

export default Show;