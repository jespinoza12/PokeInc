import {React} from "react"
import Comment from "./comment"

const Comments = ({fourm, comments}) => {
    console.log(comments)
    return (
        comments.map((comment) => (
            <div key={comment._id} className='center'>
              <div>
                <Comment comment = {comment}/>
              </div>
          </div>
        ))
        )
}

export default Comments