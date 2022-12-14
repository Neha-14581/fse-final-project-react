import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as service from "../../services/bookmark-service"
import * as security_service from "../../services/auth-service"
import Tuits from "../tuits";
import * as likesService from "../../services/likes-service";

/**
 * Component for showing the bookmarks of the user.
 * @returns {JSX.Element}
 * @constructor
 */
const Bookmarks = () => {
    const {uid} = useParams();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [tuits, setTuits] = useState([]);
    const userId = uid;
    const isUserLoggedIn = () =>
        security_service.profile()
            .then((user) => {
                if (user) {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            })
    const findBookmarkedTuits = () => {
        const user = JSON.parse(localStorage.getItem("user"));

        service.findAllTuitsBookmarkedByUser(user._id)
            .then(tuits => setTuits(tuits));
    }



    // const likeTuit = (tuit) => {
    //     const user = JSON.parse(localStorage.getItem("user"));
    //
    //     likesService.userLikesTuit(user._id, tuit._id)
    //         .then(refreshTuits)
    //         .catch(e => alert(e))
    // }
    useEffect(isUserLoggedIn);
    useEffect(() => {
        let isMounted = true;
        findBookmarkedTuits()
        return () => {
            isMounted = false;
        }
    }, []);
    return (
        <div className="ttr-bookmarks">
            <div className="border border-bottom-0">
                <h4 className="fw-bold p-2">Bookmark</h4>
                <div className="d-flex"></div>
            </div>
            {isLoggedIn && <Tuits tuits={tuits}
                                  refreshTuits={findBookmarkedTuits}/>}
        </div>
    )
}
export default Bookmarks;