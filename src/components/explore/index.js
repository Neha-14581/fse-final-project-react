// //import React, {useEffect, useState} from "react";
// import {Link, Route, Routes, useNavigate} from "react-router-dom";
// //import * as service from "../../services/auth-service"
// import AllTuits from "./all-tuits";
// import MyLikes from "./my-likes";
// import TuitsByTag from "./tuits-by-tag";
// import AllTags from "./all-tags";

// //
// const Explore = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [profile, setProfile] = useState({});
//     useEffect(async () => {
//         // try {
//         //     const user = await service.profile();
//         //     setProfile(user);
//         // } catch (e) {
//         //     // if not login, there is no profile, go to login
//         //     console.log("navigate to login")
//         //     navigate('/login');
//         // }
//     }, []);
//     return (
//         <div className="ttr-explore">
//         <div className="border border-bottom-0">
//           <h4 className="p-2 mb-0 pb-0 fw-bolder">
//             Explore
//           </h4>
//           <div className="p-2">
//             <ul className="mt-0 nav nav-pills nav-fill">
//               <li className="nav-item">
//                 <Link to="/explore/alltuits"
//                       className={`nav-link ${location.pathname.indexOf('alltuits') >= 0 ? 'active':''}`}>
//                   Tuits</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/explore/mylikes"
//                       className={`nav-link ${location.pathname.indexOf('mylikes') >= 0 ? 'active':''}`}>
//                   Likes</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/explore/tuitsbytag"
//                       className={`nav-link ${location.pathname.indexOf('tuitsbytag') >= 0 ? 'active':''}`}>
//                   Tuits By Tag</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/explore/alltags"
//                       className={`nav-link ${location.pathname.indexOf('alltags') >= 0 ? 'active':''}`}>
//                   All Tags</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//             {profile.username &&
//                 <Routes>
//                     <Route path="/alltuits" element={<AllTuits/>}/>
//                     <Route path="/mylikes" element={<MyLikes/>}/>
//                     <Route path="/tuitsbytag" element={<TuitsByTag/>}/>
//                     <Route path="/tuitsbytag/:tagString" element={<TuitsByTag/>}/>
//                     <Route path="/alltags" element={<AllTags/>}/>
//                 </Routes>
//             }
//         </div>
//     );
// }
// export default Explore;




import React from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import * as likesservice from "../../services/likes-service";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
//import React, {useEffect, useState} from "react";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
//import * as service from "../../services/auth-service"
//import AllTuits from "./all-tuits";
import MyLikes from "./my-likes";
import TuitsByTag from "./tuits-by-tag";
import AllTags from "./all-tags";


const Explore = () => {
    const location = useLocation();
    const {uid} = useParams();
    const [tuits, setTuits] = useState([]);
    const [tuit, setTuit] = useState('');
    const userId = uid;
    const [likedTuits, setLikedTuits] = useState([]);
    //const [profile, setProfile] = useState({});



    // const AllTuits = () => {

        const findTuits = () =>
            service.findAllTuits()
                .then(tuits => setTuits(tuits));
        useEffect(() => {
            let isMounted = true;
            findTuits()
            return () => {isMounted = false;}
        }, []);




    const findTuitsILike = () =>
        likesservice.findAllTuitsLikedByUser('me')
            .then((tuits) => setLikedTuits(tuits));
    useEffect(findTuitsILike, []);

    // }

    return(
        <div className="ttr-home">
            <div className="border border-bottom-0">
                <h4 className="p-2 mb-0 pb-0 fw-bolder">
                    Explore
                </h4>
                <div className="p-2">
                    <ul className="mt-0 nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link to="/explore/alltuits"
                                  className={`nav-link ${location.pathname.indexOf('alltuits') >= 0 ? 'active':''}`}>
                                Tuits</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/explore/mylikes"
                                  className={`nav-link ${location.pathname.indexOf('mylikes') >= 0 ? 'active':''}`}>
                                Likes</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/explore/tuitsbytag"
                                  className={`nav-link ${location.pathname.indexOf('tuitsbytag') >= 0 ? 'active':''}`}>
                                Tuits By Tag</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/explore/alltags"
                                  className={`nav-link ${location.pathname.indexOf('alltags') >= 0 ? 'active':''}`}>
                                All Tags</Link>
                        </li>
                    </ul>
                </div>
            </div>

                <Routes>
                    <Route path="/alltuits" element={<Tuits tuits={tuits}
                        refreshTuits={findTuits}/>}/>

                    <Route path="/mylikes" element={
                        <Tuits tuits={likedTuits} refreshTuits={findTuitsILike}/>
                    }/>

                    <Route path="/tuitsbytag" element={<TuitsByTag/>}/>

                    <Route path="/tuitsbytag/:tagString" element={<TuitsByTag/>}/>

                    <Route path="/alltags" element={<AllTags/>}/>
                </Routes>

        </div>
    );
};
export default Explore;