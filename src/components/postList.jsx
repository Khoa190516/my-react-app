import {Post} from './post'
import '../style/postList.css'
import { useEffect, useState } from 'react'
export const PostList = () => {
    const [posts, setPosts] = useState([]);

    async function fetchPosts(){
        var res = await fetch("https://petstore.swagger.io/v2/pet/findByStatus?status=available");
        var data = await res.json();
        console.log(data);
        setPosts(data);
        console.log(posts);
    }

    useEffect(()=>{
        fetchPosts();
    }, []);

    return (
        <div className='list-container'>
            <div className='list-title'> Pet List </div>
            <div className='list-post'>
                {posts.map((post, index)=>(<Post key={index} {...post}/>))}
            </div>
        </div>
    )
}