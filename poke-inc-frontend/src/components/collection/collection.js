import React from "react"
import Navbar from "../navbar/navbar";


const Collection = ({setLoginUser}) => {
    return (
        <div>
            <div className="homepage">
                <Navbar />
                <div className="button" onClick={() => setLoginUser({})} >Logout</div>
            </div>
        </div>
    )
}

export default Collection