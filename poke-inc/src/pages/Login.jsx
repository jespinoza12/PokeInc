import React, {Component} from "react";

import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

class Login extends Component {

    constructor(){
        super()
        this.state = {
            username: '',
            password:''
        }
        this.changeUsername = this.getUsername.bind(this)        
        this.changePassword = this.getPassword.bind(this)

    }


    getUsername(event) {
        this.setState({
            username: event.target.value
        })

    }
    getPassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    checkForUser(users) {

    }

    onSubmit(event){
        event.preventDefault()
        axios.get('http://localhost:6969/app/signin')
            .then(r => r.json())
            .then(data => {
                this.checkForUser(data.results)
                console.log(data.results)
            })
        
        this.setState({
            username: '',
            password:''
        })
    }

    render() {
        return(
        <div>
            <div className='container'>
                <div className='form-div'>
                    <div class="p-3 mb-2 bg-danger text-white">
                        <h1 className="text-center"> Please Login To Continue</h1>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <input type='username' placeholder='Username' onChange={this.getUsername} 
                            value = {this.state.username} className='form-control form-group'/>
                        <input type='password' placeholder='Password' onChange={this.getPassword} 
                            value = {this.state.password} className='form-control form-group'/>
                        <input type='submit' className='btn btn-danger btn-block' value='Submit'/>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default Login