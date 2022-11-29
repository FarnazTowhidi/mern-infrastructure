import React, { Component } from 'react'
import { signUp } from '../../utilities/users-service';

export class SignUpForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
      };
 
  handleSubmit = async (e) => {
    e.preventDefault();
    console.log ("clicked")
    const formData = {...this.state};
    try {
       
        delete formData.error;
        delete formData.confirm;
        const user = await signUp(formData);
        // Baby step!
        this.props.setUser(user)

    } catch {
      // An error occurred 
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  }

  
  handleChange = (evt) => {
    this.setState({
        [evt.target.name]: evt.target.value,
        error: ''
      });

  }    

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
        <div>
        <div className="form-container">
            <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label>Confirm</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <button type="submit" disabled={disable} onClick={this.handleSubmit}>SIGN UP</button>
            </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
        </div>
    );
  }
}

export default SignUpForm