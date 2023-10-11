import { Post } from './post'
import '../../style/home/postList.css'
import { useEffect, useState } from 'react'
import LazyLoad from 'react-lazy-load'
import { BASE_HEROKU_URL, POST_CONTROLLER } from '../../services/apis'
import { Loading } from '../global/loading'

export const PostList = () => {
    const [posts, setPosts] = useState([]);
    const[isLoading, setIsLoading] = useState(true);

    async function fetchPosts() {
        var localUrl = BASE_HEROKU_URL + POST_CONTROLLER;
        var res = await fetch(localUrl);
        var data = await res.json();
        console.log(data);
        setPosts(data);
        setIsLoading(false);
        console.log(posts);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className='list-container'>
            <div className='list-title'> All Posts </div>
            {
                isLoading === true ? <Loading/> : (
                    posts.length < 0 ? (
                        <div>No Post At Present</div>
                    ) : (
                        <LazyLoad>
                            <div className='list-post'>
                                {posts.map((post, index) => (<Post key={index} {...post} />))}
                            </div>
                        </LazyLoad>
                    )
                )
            }
        </div>
    )
}