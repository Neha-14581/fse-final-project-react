import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import * as profileservice from "../../services/auth-service"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

// Component uses findAllTuitsLikedByUser service to retrieve the tuits liked by "me"
// and renders them using the same tuits component

const MyLikes = () => {
    const [likedTuits, setLikedTuits] = useState([]);
    // const [profile, setProfile] = useState({});
    // const navigate = useNavigate();
    //
    // useEffect(async () => {
    //     try {
    //         const user = await profileservice.profile();
    //         setProfile(user);
    //     } catch (e) {
    //         // if not login, there is no profile, go to login
    //         console.log("navigate to likes tab")
    //         //navigate('/likes');
    //     }
    // }, []);



    const findTuitsILike = () =>
        service.findAllTuitsLikedByUser('me')
            .then((tuits) => setLikedTuits(tuits));
    useEffect(findTuitsILike, []);

    return (
        <div>
            <Tuits tuits={likedTuits} refreshTuits={findTuitsILike}/>
        </div>
    );
};
export default MyLikes;