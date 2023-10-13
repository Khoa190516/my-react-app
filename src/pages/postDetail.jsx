import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import defaultAvatar from "../assets/banner.jpg"
import "../style/post-detail/postDetail.css"
import parse from 'html-react-parser'
import { getPostById } from "../services/apis";
import { Loading } from "../components/global/loading";

export const PostDetail = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const [pet, setPet] = useState({
        id: "",
        title: "",
        postImages: [
            {
                id: "string",
                imageBase64: "string",
            },
        ],
        contact: "string",
        description: "string",
        created: "string",
        isBanned: false,
        isClosed: false
    });

    useEffect(() => {
        const fetchPostWithId = async () =>{
            var data = await getPostById(id)
            if(data !== undefined){
                setPet(data)
            }
            setIsLoading(false)
        }
        fetchPostWithId()
    }, [id]);

    return (
        <>
            <div className="detail-title">View Post</div>
            {isLoading === true ? <Loading /> : (
                pet.id !== undefined ? (
                    <div className="post-detail">
                        <div className="img-container-detail left-content">
                            <img src={pet.postImages.length <= 0 ? defaultAvatar : pet.postImages[0].imageBase64} alt="post" />
                        </div>
                        <div className="right-detail-content">
                            <div className="title-detail">{pet.title}</div><br />
                            <div className="category-detail"> <b>Contact:</b> {pet.contact !== "string" ? pet.contact : "N/A"} </div>
                            <div className="category-detail">
                                <b>Created:</b> {pet.createdString}
                            </div><br />
                            <div className="category-detail"><b>Description: </b>{pet.description === null ? "" : parse(pet.description + "")}</div>
                        </div>
                    </div>
                ) : (
                    <div>Opps... something went wrong !</div>
                ))}
        </>
    )
}