import React from 'react'
import User from "./user"

const UserList = ({users, rawr, rawr2}) => {
  

return (
    users.map((user) => (
      <div key={user._id} className='container'>
        <div>
          <User users = {user} rawr = {rawr} rawr2 = {rawr2}/>
        </div>
    </div>
  ))
  )}
export default UserList