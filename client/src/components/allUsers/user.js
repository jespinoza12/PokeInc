import React from 'react'
import { useHistory } from "react-router-dom"
import "./user.css"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';

const User = ({users, rawr, rawr2}) => {
  const history = useHistory()
  
  function cardHandler(e){  
  e.preventDefault();
  console.log('User Clicked');
  rawr(users);
//   rawr2();
  history.push(process.env.PUBLIC_URL + "/usersPage")

  }

return (
          <div>
            <img className='rounded-circle size' onClick={cardHandler} src={users.picture} alt={users.username}></img>
            <p>{users.username}</p>
          </div>
    )}

export default User