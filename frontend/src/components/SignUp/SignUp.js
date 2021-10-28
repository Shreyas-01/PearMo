import './SignUp.css';
import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { baseUrl, axiosHeaders } from '../../utils/constants';

// firstName,
// middleName,
// lastName,
// email,
// username,
// dob,
// category,
// password,
// createIn,
// channelURL,
// socials: req.body.socials -> ARRAY with social platform and link

const SignUp = () => {
    const [frameNumber, setFrameNumber] = useState(0);
    const [newUser, setNewUser] = useState({})
    const history = useHistory() 

    const onSignup = () => {
        const urisignup = `${baseUrl}signup`;

        console.log(newUser);
        axios.post(urisignup, newUser, axiosHeaders)
        .then(() => {
            console.log("Signup successful");
            history.push('/login');
        })
        .catch(error => {
            console.log("Signup failed", error);
        });
    }

    return (
        <div className="signup">
            <div className="modal-center">
                <div className="signup-text">
                    <Link to="/login" className="login-link">Sign In</Link>
                    <br />
                    <Link to="/signup" className="signup-link">Sign up</Link>
                </div>

                <div className="slanted">
                    <img src="/pearmoWhite.png" />
                </div>

                <div className="form">
                    <Link to="/" className="move-back btn btn-light">
                        <i class="fas fa-times"></i>
                    </Link>
                    <br />
                    {
                        frameNumber === 0 ?
                            <div className="container form-block">
                                <form action="">
                                <label className="label-firstname">First Name</label>
                                <input required name="firstname" type="text" onChange={(e) => setNewUser(newUser => ({...newUser, firstName: e.target.value }))} required></input>
                                <label className="label-middlename">Middle Name</label>
                                <input name="middlename" type="text" onChange={(e) => setNewUser(newUser => ({...newUser, middleName: e.target.value }))}></input>
                                <label className="label-lastname">Last Name</label>
                                <input name="lastname" type="text" onChange={(e) => setNewUser(newUser => ({...newUser, lastName: e.target.value }))} required></input>
                                <label className="label-email">Email Address</label>
                                <input name="email" type="email" onChange={(e) => setNewUser(newUser => ({...newUser, email: e.target.value }))} required></input>
                                <br/>
                                <button  onClick={() => setFrameNumber(frameNumber+1)} className="btn btn-primary">Next</button>
                                </form>
                            </div>
                            : null
                    }
                    {
                        frameNumber === 1 ?
                            <div className="container form-block">
                                <label className="label-date">Date of Birth</label>
                                <input name="date" type="date" onChange={(e) => setNewUser(newUser => ({...newUser, dob: e.target.value }))}></input>
                                <br />
                                <label className="label-registeras" >Register As</label>
                                <select id="lab" className="form-control">
                                    <option selected>Choose...</option>
                                    <option>Creator</option>
                                    <option>Sponsor</option>
                                </select>
                                <br/>
                                <button  onClick={() => setFrameNumber(frameNumber+1)} className="btn btn-primary">Next</button>
                            </div>
                            : null
                    }
                    {
                        frameNumber === 2 ? 
                            <div className="container form-block">
                                <label className="label-password">Password *</label>
                                <input name="password" type="password"></input>
                                <label className="label-password">Confirm Password *</label>
                                <input name="password" type="password" onChange={(e) => setNewUser(newUser => ({...newUser, password: e.target.value }))}></input>
                                <br/>
                                <button  onClick={() => setFrameNumber(frameNumber+1)} className="btn btn-primary">Next</button>
                            </div>
                            : null
                    }
                    {
                        frameNumber === 3 ?
                            <div className="container form-block">
                                <label className="label-fieldOfInterest">Creates In/ Sponsors In</label>
                                <input name="fieldOfInterest" type="text" onChange={(e) => setNewUser(newUser => ({...newUser, createsIn: e.target.value }))}></input>
                                <label className="label-urllink">Channel URL/ Company URL</label>
                                <input name="urllink" type="link" onChange={(e) => setNewUser(newUser => ({...newUser, channelURL: e.target.value }))}></input>
                                <br/>
                                <button type="submit" onClick={() => setFrameNumber(frameNumber+1)} className="btn btn-primary">Sign up</button>
                            </div>
                            : null
                    }
                    {
                        frameNumber === 4 ?
                            <div className="container form-block">
                                <label className="label-social1">Facebook</label>
                                <input name="social1" type="text" onChange={(e) => setNewUser(newUser => ( {...newUser  , socials :[{social: "facebook", link: e.target.value }]}   ))}></input>
                                <label className="label-social2">Youtube</label>
                                <input name="social2" type="link" onChange={(e) => setNewUser(newUser => ( {...newUser , socials: [...newUser.socials, {social: "youtube", link: e.target.value}]}  ))}></input>
                                <label className="label-social3">Twitter</label>
                                <input name="social3" type="link" onChange={(e) => setNewUser(newUser => ( {...newUser , socials:[...newUser.socials, {social: "twitter", link: e.target.value}] } ))}></input>
                                <label className="label-social4">Instagram</label>
                                <input name="social4" type="link" onChange={(e) => setNewUser(newUser => ( {...newUser , socials:[...newUser.socials, {social: "instagram", link: e.target.value}] } ))}></input>
                                <br/>
                                <button type="submit" onClick={onSignup} className="btn btn-primary">Sign up</button>
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    );
}

export default SignUp;