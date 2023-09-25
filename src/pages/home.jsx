import React from "react"
import {PostList} from "../components/postList"
import '../style/home.css'

export const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <PostList></PostList>
        </div>
    )
}