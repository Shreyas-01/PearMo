import React, { useState } from 'react';
import './NewPost.css';
import axios from 'axios';
import { UserDataContext } from '../../../../../App';
import { baseUrl, axiosHeaders } from '../../../../../utils/constants';

const NewPost = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const uri = `${baseUrl}/post`;
        axios.post(uri, axiosHeaders, {
            data: {
                title: title,
                description: desc,
                text: text,
                image: image,
                userId: UserDataContext.userId,
                categoryId: UserDataContext.categoryId,
                category: UserDataContext.category
                }
            })
            .then(() => {
                console.log("New post sent to backend successfully.");
            })
            .catch(error => {
                console.log("New post could not be sent to backend.", error);
            });
    };

    return (
        <div className="new-post">
            
            <div className="new-post-content">
                <div className="profile-image col-2">
                    <img  alt="unavailable" src="https://drive.google.com/uc?export=view&id=1DVhHrkvFLWg88X2HLF7_NdbDzeJs0C3E" />
                </div>

                <div className="new-post-content col-9">
                    <textarea
                        type="text"
                        placeholder="Write something here..."
                        className="write-content"
                        autoFocus={true}
                        onChange={e=>setTitle(e.target.value)}
                    />
                </div>
                <div className="new-post-submit">
                    <i class="far fa-paper-plane fa-lg"></i>
                </div>
            </div>

            <div className="new-post-footer">
                    <button className="btnn">Looking for Collaboration/Sponsor</button>
                    <button className="btnn">Add Photos/Videos</button>

                    {/* <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => setImage(e.target.files[0])}
                    /> */}
            </div>
        </div>
    );
};

export default NewPost;