import React, { useState } from 'react';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword:''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // colocar mais coisas aqui

    console.log('Signing up with:', formData);
  };

  return (
    <div className="container mt-5 w-50">
      <h2 className="text-center">Sign Up</h2>
      <form  onSubmit={handleSignup}>

        <div className="form-row m-auto " >
          <div className="form-group col-md-6 m-auto">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group col-md-6 m-auto">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-group col-md-6 m-auto" >
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group col-md-6 m-auto">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group col-md-6 m-auto">
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button style={{ width:"100px"}} type="submit" className="d-block m-auto mt-2 btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
