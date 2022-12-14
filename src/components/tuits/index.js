import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as tuitService from "../../services/tuits-service";
import * as bookmarkService from "../../services/bookmark-service";

const Tuits = ({tuits = [], refreshTuits}) => {
    const likeTuit = (tuit) => {
        const user = JSON.parse(localStorage.getItem("user"));

        likesService.userLikesTuit(user._id, tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))
    }

    const dislikeTuit = (tuit) => {
        const user = JSON.parse(localStorage.getItem("user"));

        likesService.userDislikesTuit(user._id, tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))

    }

    const bookmarkToggle = (tuit) => {
        const user = JSON.parse(localStorage.getItem("user"));

        bookmarkService.userBookmarksTuit(user._id, tuit._id)
            .then(refreshTuits)
            .catch(e =>alert(e))
    }


    const deleteTuit = (tid) =>
        tuitService.deleteTuit(tid)
            .then(refreshTuits);

    return (
        <div>
            <ul className="ttr-tuits list-group">
                {
                    tuits && tuits.map(tuit =>
                        <Tuit key={tuit._id}
                              deleteTuit={deleteTuit}
                              likeTuit={likeTuit}
                              dislikeTuit={dislikeTuit}
                              bookmarkTuit={bookmarkToggle}
                              tuit={tuit}/>)
                }
            </ul>
        </div>
    );
}

export default Tuits;