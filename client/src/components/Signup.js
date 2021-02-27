import React from 'react';
import axios from 'axios';
import { Redirect,Link } from 'react-router-dom';
import UserImg from "../Image/user.jpg";
class Signup extends React.Component
{
    state = {
        name : '',
        email: '',
        password:'',
        redirect:false

    }
    handleChange = (e)=>{
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit = ()=>{
        if(this.state.name!='' && this.state.email!='',this.state.password!='')
        {
            axios.post('http://localhost:5000/signup',this.state)
            .then(res=>{
                console.log('successfully posted');
                this.setState({name:'',email:'',password:''});
               
            });
         
            this.setState({redirect:true})

        }
    }


 renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/login' />
        }
      }
    

    render()
    {
        return(
            <div class="row text-center">
                {this.renderRedirect()}
                <div class="col-md-4">
                    <form onSubmit={()=>this.handleSubmit()} style={{width:"100%"}}>
                    <b><i> <h1 class ="heading">SIGN-UP</h1></i></b>
                    <img class="userImg" src={UserImg} alt="Logo" />
                        <input required onChange={(e)=>this.handleChange(e)} name='name'  type="text" value={this.state.name} style={{fontSize:'15px',fontFamily:'Cursive,sans-serif,Gugi',borderRadius:'10px',marginLeft:'50px',marginTop:'20px'}} placeholder="Name" class="form-control"/>
                        <input required onChange={(e)=>this.handleChange(e)} name="email" type="email" value={this.state.email} style={{fontSize:'15px',fontFamily:'Cursive,sans-serif,Gugi',borderRadius:'10px',marginLeft:'50px',marginTop:'20px'}} placeholder="Email" class="form-control"/>
                        <input required onChange={(e)=>this.handleChange(e)} name='password' type="password" value={this.state.password} style={{fontSize:'15px',fontFamily:'Cursive,sans-serif,Gugi',borderRadius:'10px',marginLeft:'50px',marginTop:'20px'}} placeholder="Password" class="form-control"/>
                        
                        <button style={{borderRadius:'10px',fontSize:'19px',fontFamily:'Cursive,sans-serif,Gugi',outline:'none',color:'white',backgroundColor:'#000066',marginLeft:'90px',marginTop:'20px',width:'380px'}} class="btn">CREATE</button>
                    </form>
                </div>
                {/* <div class="col-md-8">
                    <img src={team}/>
                </div> */}
            </div>
        );
    }
}
export default Signup;