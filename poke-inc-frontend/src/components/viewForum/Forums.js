import React from "react"
import ForumCard from "./forumCard"
import MyForumCard from "./myForumCard"
const Forums = ({forums, rawr, myforum}) => {

    return (
        forums.map((forum) => (
            <div key={forum._id} className=''>
              <div>
                {
                  myforum ? <MyForumCard forum = {forum} rawr = {rawr} deck = {forum.deck[0]}/> : <ForumCard forum = {forum} rawr = {rawr} deck = {forum.deck[0]}/>
                }
              </div>
          </div>
        ))
        )
}

export default Forums