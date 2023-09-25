import ViewPostButtonButton from "./viewPostButton"
import '../style/post.css'
import defaultAvatar from '../assets/banner.jpg'
import LazyLoad from "react-lazy-load"

export const Post = (post) => {
    return (
        <>
            {
                post.photoUrls == undefined ? (
                    <div>Something went wrong !</div>
                ) : (
                    <div className="post">
                        <div className="img-container">
                            <LazyLoad>
                                <img className="pet-img" src={post.photoUrls[0] !== "string" ? post.photoUrls[0] : defaultAvatar} alt="post" />
                            </LazyLoad>
                        </div>
                        <div className="title">{post.name}</div>
                        <div className="category"> Category: {post.category && post.category.name !== "string" ? post.category.name : "N/A"} </div>
                        <ViewPostButtonButton {...post} />
                    </div>
                )
            }
        </>
    )
}