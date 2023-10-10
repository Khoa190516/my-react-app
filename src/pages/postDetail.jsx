import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import defaultAvatar from "../assets/banner.jpg"
import "../style/postDetail.css"
import parse from 'html-react-parser'

export const PostDetail = () => {
    const { id } = useParams();
    const getByIdUrl = "https://petstore.swagger.io/v2/pet/";
    var localPetUrl = "https://localhost:7217/api/Posts/get-by-id?postId=";
    const [pet, setPet] = useState({
        id: "string",
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

    async function GetPet() {
        console.log(localPetUrl + id);
        var url = localPetUrl + id + "";
        var res = await fetch(url);
        var data = await res.json();
        console.log("Data: " + data);
        setPet(data);
    }

    useEffect(() => {
        GetPet();
    }, []);

    return (
        <>
            <div className="detail-title">View Post</div>
            {pet.id !== undefined ? (
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
            )}
        </>
    )
}