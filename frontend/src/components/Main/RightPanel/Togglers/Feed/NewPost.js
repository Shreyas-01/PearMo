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
        <div className="post">
            <form className="postForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <input
                        type="text"
                        placeholder="Title"
                        className="writeInput"
                        autoFocus={true}
                        onChange={e=>setTitle(e.target.value)}
                    />
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>

                <div className="postFormGroup">
                    <textarea
                        placeholder="Description"
                        type="text"
                        className="postDesc"
                        onChange={e=>setDesc(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <textarea
                        placeholder="Text"
                        type="text"
                        className="postText"
                        onChange={e=>setText(e.target.value)}
                    ></textarea>
                </div>
                
                <button className="submitPost" type="submit">Publish</button>
            </form>
        </div>
    );
};

export default NewPost;