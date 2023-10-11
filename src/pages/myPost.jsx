import { useEffect, useState } from "react";
import { MyPostCard } from "../components/my-post/myPostCard";
import LazyLoad from "react-lazy-load";
import 'reactjs-popup/dist/index.css';
import { PopUpCreateModal } from "../components/my-post/popUpCreateModal";
import { ACCOUNT_CONTROLLER, BASE_HEROKU_URL, MY_POST } from "../services/apis";
import { Loading } from "../components/global/loading";
import '../style/my-post/myPost.css';

export const MyPost = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
                    title: "",
                    contact: "",
                    createdString: "",
                    description: "",
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
        const url = BASE_HEROKU_URL + ACCOUNT_CONTROLLER + MY_POST;
        var token = "Bearer " + localStorage.getItem('token');
        console.log(token);
        setIsLoading(true);
        var res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });
        var data = await res.json();
        setIsLoading(false);
        console.log(data);
        setUserPosts(data);
        console.log(data);
        console.log(userPosts);
        console.log(isLoading);
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
            <div className="my-post-title">My Posts</div>
            {
                isLoading === true ? <Loading /> : (
                    isLogin === true ? (
                        <>
                            <div>
                                <PopUpCreateModal></PopUpCreateModal>
                            </div>
                            <LazyLoad>
                                <div className="list-post">
                                    {
                                        userPosts.posts.map((post, index) => (<MyPostCard key={index} {...post} />))
                                    }
                                </div>
                            </LazyLoad>
                        </>
                    ) : (
                        <div>Log in to view posts</div>
                    )
                )
            }
        </>
    );
} 