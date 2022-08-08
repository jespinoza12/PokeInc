import React from 'react'
import Post from "./post"
import "./post"

const PostList = ({posts, rawr}) => {
  

return (
    posts.map((post) => (
      <div key={post._id}>
        <div>
          <Post posts = {post} rawr ={rawr} />
        </div>
    </div> 
  ))
  )}
export default PostList