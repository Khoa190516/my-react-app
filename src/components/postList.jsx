import { Post } from './post'
import '../style/postList.css'
import { useEffect, useState } from 'react'
import LazyLoad from 'react-lazy-load'

export const PostList = () => {
    const [posts, setPosts] = useState([]);

    async function fetchPosts() {
        var url = "https://demo-node-js-api-e9f692f0b746.herokuapp.com/posts";
        var localUrl = "https://localhost:7217/api/Posts";
        var dotNetUrl = "https://petgarden-f030018191f7.herokuapp.com/api/Posts/sample-data";
        var res = await fetch(localUrl);
        var data = await res.json();
        console.log(data);
        setPosts(data);
        console.log(posts);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className='list-container'>
            <div className='list-title'> All Posts </div>
            {
                posts.length < 0 ? (
                    <div>No Post To Show</div>
                ) : (
                    <LazyLoad>
                        <div className='list-post'>
                            {posts.map((post, index) => (<Post key={index} {...post} />))}
                        </div>
                    </LazyLoad>
                )
            }
        </div>
    )
}