import React from "react"
import ForumCard from "./forumCard"
const Forums = ({forums, rawr}) => {

    return (
        forums.map((forum) => (
            <div key={forum._id} className=''>
              <div>
                <ForumCard forum = {forum} rawr = {rawr} deck = {forum.deck[0]}/>
              </div>
          </div>
        ))
        )
}

export default Forums