import ViewPostButtonButton from "./viewPostButton"
import '../style/post.css'
import defaultAvatar from '../assets/banner.jpg'

export const Post = (post) => {
    return (
        <div className="post">
            <div className="img-container">
                <img src={post.photoUrls[0] !== "string" ? post.photoUrls[0] : defaultAvatar} alt="post"/>
            </div>
            <div className="title">{post.name}</div>
            <div className="category"> Category: {post.category && post.category.name !== "string" ? post.category.name : "N/A" } </div>
            <ViewPostButtonButton {...post}/>
        </div>
    )
}