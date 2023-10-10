import { useEffect, useState } from "react";
import { Post } from "../components/post";
import LazyLoad from "react-lazy-load";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { PopUpCreateModal } from "../components/popUpCreateModal";

export const MyPost = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [userPosts, setUserPosts] = useState(
        {
            id: "string",
            email: "",
            imageURL: "",
            name: "",
            role: "",
            posts: [
                {
                    id: "",
                    contact: "",
                    createdString: "",
                    description: "",
                    title: "",
                    postImages: [
                        {
                            id: "",
                            imageBase64: "",
                        }
                    ]
                }
            ]
        }
    );

    async function GetMyPosts() {
        var url = "https://localhost:7217/api/AuthUser/get-posts-by-user";
        var token = "Bearer " + localStorage.getItem('token');
        console.log(token);
        var res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });
        var data = await res.json();
        console.log(data);
        setUserPosts(data);
        console.log(data);
        console.log(userPosts);
    }

    useEffect(() => {
        var token = localStorage.getItem('token');
        if (token === undefined || token === "" || token === null) {
            setIsLogin(false);
        } else {
            setIsLogin(true);
            GetMyPosts();
        }
    }, [])

    return (
        <>
            <div className="title">My Posts</div>
            {
                isLogin === true ? (
                    <>
                        <div>
                            <PopUpCreateModal></PopUpCreateModal>
                        </div>
                        <LazyLoad>
                            <div className="list-post">
                                {
                                    userPosts.posts.map((post, index) => (<Post key={index} {...post} />))
                                }
                            </div>
                        </LazyLoad>
                    </>
                ) : (
                    <div>Log in to view posts</div>
                )
            }
        </>
    );
} 