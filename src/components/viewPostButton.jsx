import { useNavigate } from "react-router-dom"

export default function ViewPostButton(post){
    const navigate = useNavigate();

    function showPost(){
        navigate(`/pet/${post.id}`);
    }

    return (
        <button onClick={showPost} className="view-post-button">View More</button>
    )
}