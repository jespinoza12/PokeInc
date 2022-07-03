import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

class SignUp extends Component {
    constructor(){
        super()
        this.state = {
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            username: '',
            password:''
        }
        this.changeFirstName = this.changeFirstName.bind(this)
        this.changeMiddleName = this.changeMiddleName.bind(this)
        this.changeLastName = this.changeLastName.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }

    changeFirstName(event) {
        this.setState({
            firstName: event.target.value
        })

    }
    changeMiddleName(event) {
        this.setState({
            middleName: event.target.value
        })
    }
    changeLastName(event) {
        this.setState({
            lastName: event.target.value
        })
    }
    changeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }
    changeUsername(event) {
        this.setState({
            username: event.target.value
        })
    }
    changePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    onSubmit(event){
        event.preventDefault()
        const registered = {
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }

        axios.post('http://localhost:6969/app/signup', registered)
            .then(response => console.log(response.data))

        
        window.location = 'http://localhost:3000/login'

        this.setState({
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            username: '',
            password:''
        })
    }

    render() {
        return ( 
            <div>
                <div className='container'>
                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <input type='text' placeholder='First Name' onChange={this.changeFirstName} 
                            value = {this.state.firstName} className='form-control form-group'/>
                            <input type='text' placeholder='Middle Name' onChange={this.changeMiddleName} 
                            value = {this.state.middleName} className='form-control form-group'/>
                            <input type='text' placeholder='Last Name' onChange={this.changeLastName} 
                            value = {this.state.lastName} className='form-control form-group'/>
                            <input type='email' placeholder='Email' onChange={this.changeEmail} 
                            value = {this.state.email} className='form-control form-group'/>
                            <input type='username' placeholder='Username' onChange={this.changeUsername} 
                            value = {this.state.username} className='form-control form-group'/>
                            <input type='password' placeholder='Password' onChange={this.changePassword} 
                            value = {this.state.password} className='form-control form-group'/>
                            <input type='submit' className='btn btn-danger btn-block' value='Submit'/>
                        </form>
                    </div>
                    <p>Already have an account? Sign In Here</p>
                </div>
            </div>
        )
    }
}

export default SignUp;