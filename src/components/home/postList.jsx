import { Post } from './post'
import '../../style/home/postList.css'
import { useEffect, useState } from 'react'
import LazyLoad from 'react-lazy-load'
import { BASE_HEROKU_URL, POST_CONTROLLER } from '../../services/apis'

export const PostList = () => {
    const [posts, setPosts] = useState([]);

    async function fetchPosts() {
        var localUrl = BASE_HEROKU_URL + POST_CONTROLLER;
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