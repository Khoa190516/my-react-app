import { Post } from './post'
import '../../style/home/postList.css'
import { useEffect, useState } from 'react'
import LazyLoad from 'react-lazy-load'
import { Loading } from '../global/loading'
import { getPosts } from '../../services/apis'
 
export const PostList = () => {
    const [posts, setPosts] = useState([]);
    const[isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            var data = await getPosts();
            if(data !== undefined){
                setPosts(data);
            }
            setIsLoading(false);
        }
        setIsLoading(true);
        fetchPosts()
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