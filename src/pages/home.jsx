import React from "react"
import {PostList} from "../components/home/postList"
import '../style/home/home.css'

export const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <PostList></PostList>
        </div>
    )
}