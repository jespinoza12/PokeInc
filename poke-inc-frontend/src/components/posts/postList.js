import React from 'react'
import Post from "./post"
import "./post"

const PostList = ({posts}) => {
  

return (
    posts.map((post) => (
      <div key={post._id}>
        <div>
          <Post posts = {post} />
        </div>
    </div> 
  ))
  )}
export default PostList