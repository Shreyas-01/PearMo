import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer d-flex flex-column">
            <div className="row">
                <div className="col-sm-2">
                    <div className="d-flex flex-column list">
                        <div>About</div>
                        <div>Community Guidelines</div>
                        <div>Privacy & Terms</div>
                        <div>Sales Solution</div>
                        <div>Safety Center</div>
                    </div>
                </div>
                <div className="col-sm-2 p-0">
                    <div className="d-flex flex-column list">
                        <div>Accessibility</div>
                        <div>Carrers</div>
                        <div>Ads Choices</div>
                        <div>Mobile</div>
                    </div>
                </div>
                <div className="col-sm-2 p-0">
                    <div className="d-flex flex-column list">
                        <div>Talent Solutions</div>
                        <div>Marketing Solutions</div>
                        <div>Advertising</div>
                        <div>Small Business</div>
                    </div>
                </div>
                <div className="col-sm-3 p-0">
                    <div className="d-flex flex-column list">
                        <div className="text-dark">
                            <i className="fa fa-question" aria-hidden="true"></i> Questions? 
                        </div>
                        <br />
                        <div className="text-dark">
                            <i className="fas fa-cog"></i> Manage your account setting
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 text-dark">
                    <select className="container form-control form-control-sm">
                        <option>Language</option>
                        <option>English</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Footer;