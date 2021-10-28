import './JoinUs.css';
import React from 'react';
import {useHistory} from 'react-router-dom';

const JoinUs = () => {
    const history = useHistory();
    
    return (
        <div className="joinus container-fluid">
            <div className="row">
                <div className="col-12 joinus-image">
                    <img src="./bpearmo.png" onClick={() => history.push('/')}></img>
                </div>
            </div>

            <div className="row content">
                <div className="about-us col-lg-6 col-md-8 col-xs-8">
                    <div className="aboutus">
                        <h1>About us</h1>
                    </div>
                    
                    <div className="our-mission">
                        <h2>Our mission</h2>
                        <p>The Creator economy has grown rapidly in the previous years, yet monetizing content has posed quite a few challenges for creators.</p>
                        <p>At PearMo, we are taking on this problem head-on, and building a platform to empower Creators, businesses and freelancers. It will enable them to monetize, network and grow as a community.</p>
                    </div>
                    
                    <div className="our-values">
                        <h2>Our Values</h2>
                        <ol>
                            <li>Ownership. We believe everyone should take responsibility for mishaps and get the work done.</li>
                            <li>Customer Satisfaction. "There is only one boss. The customer" (Sam Walton)</li>
                            <li>Strong opinions, loosely held. We make sure our thoughts are conveyed while our actions are aligned towards a common goal. No time for fussing around.</li>
                            <li>We're fully remate. Work from where ever you please. PJs or Suits? Totally your call</li>
                        </ol>
                    </div>

                    <div className="our-team">
                        <h2>Our Team</h2>
                        <p>We are BITSian founders, who have worked on idolPanda, a digital branding services startup clocking revenue of over $10,000 annually. Working in the field we realized there is a huge gap between businesses and creators.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JoinUs;