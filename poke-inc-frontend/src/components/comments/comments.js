import {React} from "react"
import Comment from "./comment"

const Comments = ({fourm, comments}) => {
    console.log(comments)
    return (
        comments.map((comment) => (
            <div key={comment._id} className=''>
              <div>
                <Comment comment = {comment}/>
              </div>
          </div>
        ))
        )
}

export default Comments