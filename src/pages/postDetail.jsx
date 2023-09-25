import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import defaultAvatar from "../assets/banner.jpg"
import "../style/postDetail.css"

export const PostDetail = () => {
    const { id } = useParams();
    const getByIdUrl = "https://petstore.swagger.io/v2/pet/";
    const [pet, setPet] = useState({
        id: 0,
        photoUrls: [
            "string"
        ],
        name: "string",
        category: {
            id: 0,
            name: "string"
        }
    });

    async function GetPet() {
        console.log(getByIdUrl + id);
        var url = getByIdUrl + id + "";
        var res = await fetch(url);
        var data = await res.json();
        console.log(data);
        setPet(data);
    }

    useEffect(() => {
        GetPet();
    }, []);

    return (
        <>
            <div className="detail-title">View Pet</div>
            {pet.id !== undefined ? (
                <div className="post-detail">
                    <div className="img-container-detail left-content">
                        <img src={pet.photoUrls[0] !== "string" ? pet.photoUrls[0] : defaultAvatar} alt="post" />
                    </div>
                    <div className="right-detail-content">
                        <div className="title-detail">Name: {pet.name}</div>
                        <div className="category-detail"> Category: {pet.category && pet?.category.name !== "string" ? pet.category.name : "N/A"} </div>
                        <div className="category-detail">
                            Tags: {pet.tags && pet.tags.map((tag, index) => {
                                return (
                                    <span key={index}>{tag.name}</span>
                                )
                            })}
                        </div>
                        <div className="category-detail">
                            Status: {pet.status}
                        </div>
                    </div>
                </div>
            ) : (
                <div>Opps... something went wrong !</div>
            )}
        </>
    )
}