import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {


  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  // let history = useHistory();
  let navigate = useNavigate();
  const handleSubmit = async (e) => {

    e.preventDefault();
    const { name, email, password } = credentials;

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/");
      props.showAlert("Account Created Successfully","success")
    } else {
      props.showAlert('This Email Already Exists','danger')
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='mt-3'>
      <h2 className='mb-3'>Signup an Account to use iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Enter Your Name</label>
          <input type="name" className="form-control" id="name" onChange={onChange} name="name" aria-describedby="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" onChange={onChange} name="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} name="password" id="password" minLength={5} required/>
        </div>
        {/* <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control"onChange={onChange}  name="cpassword" id="cpassword" />
        </div> */}

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
