import '../../style/home/post.css'
import defaultAvatar from '../../assets/banner.jpg'
import LazyLoad from "react-lazy-load"
import { PopUpEditModal } from "./popUpEditModal"
import Skeleton from 'react-loading-skeleton';

export const MyPostCard = (post) => {
    return (
        <>
            {
                post.id === undefined ? (
                    <div>Something went wrong !</div>
                ) : (
                    <div className="post">
                        <div className="img-container">
                            <LazyLoad>
                                <img className="pet-img" src={post.postImages.length > 0 ? post.postImages[0].imageBase64 : defaultAvatar} alt="post" />
                            </LazyLoad>
                        </div>
                        <div className="title">{post.title}</div>
                        <div className="category"> <b>Contact:</b> {post.contact && post.contact !== "string" ? post.contact : <Skeleton count={1}/>} </div>
                        <PopUpEditModal {...post}/>
                    </div>
                )
            }
        </>
    )
}