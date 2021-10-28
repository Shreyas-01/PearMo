import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl, axiosHeaders } from '../../../../../utils/constants';
import RenderSponsor from './RenderSponsor';

const Sponsors = () => {
    const [sponsors, setSponsors] = useState([]);
    const [sponsordata, setSponsorData] = useState([]);

    const urisponsor = `${baseUrl}sponsor`;

    useEffect(() => {
        axios.get(urisponsor, axiosHeaders)
            .then(result => {
                console.log("Sponsors fetched from backend successfully.");
                setSponsors(result.data.sponsors);
            })
            .catch(error => {
                console.log("Sponsors could not be fetched from backend.", error);
            });
            console.log(sponsordata)
    },[]);

    return (
        <div className="sponsors">
            {sponsors.map((sponsor) => <RenderSponsor sponsor={sponsor} key={sponsor.userId}/>)}
        </div>
    );
}

export default Sponsors;