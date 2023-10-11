import { useNavigate } from "react-router-dom"

export const ViewMyPostButton = (post) => {
    const navigate = useNavigate();

    function showPost(){
        navigate(`/pet/${post.id}`);
    }

    return (
        <div className="view-btn-container">
            <button onClick={showPost} className="view-post-button">View</button>
        </div>
    )
}