import { useNavigate } from "react-router-dom"

export default function ViewPostButton(post){
    const navigate = useNavigate();

    function showPost(){
        navigate(`/pet/${post.id}`);
    }

    return (
        <div className="view-btn-container">
            <button onClick={showPost} className="view-post-button">More Details</button>
        </div>
    )
}