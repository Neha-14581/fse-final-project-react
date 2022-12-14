import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as tuitService from "../../services/tuits-service";
import * as bookmarkService from "../../services/bookmark-service";

const Tuits = ({tuits = [], refreshTuits}) => {
    const likeTuit = (tuit) =>
        likesService.userLikesTuit('me', tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))

    const dislikeTuit = (tuit) =>
        likesService.userDislikesTuit('me', tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))
    
    const bookmarkToggle = (tuit) =>
        bookmarkService.userBookmarksTuit('me', tuit._id)
            .then(refreshTuits)
            .catch(e =>alert(e))

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