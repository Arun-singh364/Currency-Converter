import React, { Component } from 'react'
import {Link,Redirect} from "react-router-dom"
import "../components/Login.css";
import "./Login.css";
import axios from "axios";

 class Login extends Component {
    state={
        email:"",
        password:"",
        redirect:false
    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit=(e)=>{

        if(this.state.email!='' && this.state.password!='')
        {
            axios.put(`http://localhost:5000/updatepassword/${this.state.email}`,{password:this.state.password})
            .then(res=>{
        
                if(res.data.n==0){
                    alert('invalid email')
                }
                else{
                    this.setState({redirect:true})
                }
                this.setState({email:'',password:''});
               
            });
           e.preventDefault();

        }
         }
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/login' />
        }
      }

    render() {
        return (
            <div className="row text-center">
            {this.renderRedirect()}
           { sessionStorage.setItem('userName',this.state.username)}
            <div className="col-md-4 col-md-offset-3 form" >
            
                <form onSubmit={(e)=>this.handleSubmit(e)}>
               <b><i> <h1 style={{color:"red", marginLeft:"50px"}}>Set Your Password</h1></i></b>
                    <input type="email" style={{fontSize:'15px',fontFamily:'Cursive,sans-serif,Gugi',borderRadius:'10px',marginLeft:'50px',marginTop:'20px'}} required name="email" value={this.state.email} onChange={(e)=>this.handleChange(e)} placeholder="Email" className="form-control"/>
                    <input type="password" style={{fontSize:'15px',fontFamily:'Cursive,sans-serif,Gugi',borderRadius:'10px',marginLeft:'50px',marginTop:'20px'}} required name="password" value={this.state.password}  onChange={(e)=>this.handleChange(e)} placeholder="New Password" className="form-control"/>
                   <button id="loginbtn" style={{borderRadius:"10px"}} required className="btn-primary">Update</button>
            
                   
                </form>
        
            </div>
                
            </div>
        )
    }
}

export default Login
