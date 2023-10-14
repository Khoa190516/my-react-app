import { useContext, useEffect, useState } from "react";
import { MyPostCard } from "../components/my-post/myPostCard";
import LazyLoad from "react-lazy-load";
import 'reactjs-popup/dist/index.css';
import { PopUpCreateModal } from "../components/my-post/popUpCreateModal";
import { getMyPosts } from "../services/apis";
import { Loading } from "../components/global/loading";
import '../style/my-post/myPost.css';
import { ApiContext } from "../store/ApiContext";

export const MyPost = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { isLoggedIn } = useContext(ApiContext)
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

    useEffect(() => {
        const fetchMyPosts = async (token) => {
            var data = await getMyPosts(token)
            if (data !== undefined) {
                setUserPosts(data)
            }
            setIsLoading(false)
        }

        var token = localStorage.getItem('token');
        if (token === undefined || token === "" || token === null) {
            setIsLogin(false);
        } else {
            setIsLogin(true);
            setIsLoading(true)
            fetchMyPosts(token);
        }
    }, [isLoggedIn])

    return (
        <div className="my-post-page">
            {
                isLoading === true ? <Loading /> : (
                    isLogin === true ? (
                        <div className={userPosts.posts.length > 0 ? "" : "my-post-list-container"}>
                            <div>
                                <PopUpCreateModal></PopUpCreateModal>
                            </div>
                            <div className="my-post-title">My Posts</div>
                            <LazyLoad>
                                <div className="list-post">
                                    {
                                        userPosts.posts.map((post, index) => (<MyPostCard key={index} {...post} />))
                                    }
                                </div>
                            </LazyLoad>
                        </div>
                    ) : (
                        <div className="no-my-post-container">
                            <div className="no-post-txt">Log in to view posts</div>
                        </div>
                    )
                )
            }
        </div>
    );
} 