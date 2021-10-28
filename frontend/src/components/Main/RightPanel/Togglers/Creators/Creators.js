import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { baseUrl, axiosHeaders } from '../../../../../utils/constants';
import RenderCreator from './RenderCreator';

const Creators = () => {
    const [creators, setCreators] = useState([]);

    const uricreator = `${baseUrl}creator`;

    useEffect(() => {
        axios.get(uricreator, axiosHeaders)
            .then(result => {
                console.log("Creators fetched from backend successfully.");
                setCreators(creators => result.data.creators)
            })
            .catch(error => {
                console.log("Creators could not be fetched from backend.", error);
            });
    },[]);

    return (
        <div className="creators">
            {creators.map(creator => <RenderCreator creator={creator} key={creator.userId} />)}
        </div>
    );
}

export default Creators;