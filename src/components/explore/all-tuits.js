import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits"

const AllTuits = () => {
    console.log("Reached here!")
    const [tuits, setTuits] = useState([]);


    const findTuits = () => {
        service.findAllTuits()
            .then(tuits => {
                setTuits(tuits);
            })
    }
    console.log(findTuits);
    useEffect(() => {
        // findTuits()
    }, []);

    // const findTuits = () =>
    //     service.findAllTuits()
    //         .then(tuits => {
    //             setTuits(tuits)
    //         });
    // useEffect(() => {
    //     // let isMounted = true;
    //     findTuits()
    //     // return () => {isMounted = false;}
    // }, []);

    return (
        <div className="ttr-home">
            <Tuits tuits={tuits} refreshTuits={findTuits}/>
        </div>


    )
}

export default AllTuits;