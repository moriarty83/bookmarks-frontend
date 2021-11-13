import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";


function Main(props) {
    const [bookmarks, setBookmarks] = useState(null);

    const URL = "https://mongoose-bookmarks.herokuapp.com/bookmarks/"

    const getBookmarks = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setBookmarks(data);
    }

    const createBookmarks = async (bookmark) => {
        // make post request to create people
        await fetch(URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookmark),
        });
        // update list of bookmarks
        getBookmarks();
    };

    const updateBookmarks = async (bookmark, id) => {
        console.log(id)
        console.log(bookmark)
        // make a put request to create bookmarks
        await fetch (URL + id, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookmark)
        }).catch((error)=>{console.log(error)});
        getBookmarks();
    };

    const deleteBookmarks = async (id) => {
        // make the delete request
        await fetch(URL + id, {
            method: "delete"
        });
        getBookmarks()
    };

    useEffect(() => getBookmarks(), []);

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Index bookmarks={bookmarks} createBookmarks={createBookmarks} />
                </Route>
                <Route
                    path="/bookmarks/:id"
                    render={(rp) => (
                        <Show
                            {...rp}
                            bookmarks={bookmarks}
                            updateBookmarks={updateBookmarks}
                            deleteBookmarks={deleteBookmarks}
                        />
                    )}
                />    
            </Switch>
        </main>
    );
}

export default Main;
