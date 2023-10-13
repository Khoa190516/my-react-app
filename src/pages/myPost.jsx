import { useEffect, useState } from "react";
import { MyPostCard } from "../components/my-post/myPostCard";
import LazyLoad from "react-lazy-load";
import 'reactjs-popup/dist/index.css';
import { PopUpCreateModal } from "../components/my-post/popUpCreateModal";
import { getMyPosts } from "../services/apis";
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

    useEffect(() => {
        const fetchMyPosts = async (token) => {
            var data = await getMyPosts(token)
            if(data !== undefined){
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
                        <div className="no-post-txt">Log in to view posts</div>
                    )
                )
            }
        </>
    );
} 