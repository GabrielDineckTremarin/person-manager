import React, { useState } from 'react';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Logging in with:', credentials);
  };

  return (
    <div className="container mt-5 w-25">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleLogin} className='d-flex align-center flex-column'>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={credentials.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button style={{ width:"100px"}}  type="submit" className="btn btn-primary mt-2 m-auto">Login</button>
      </form>
    </div>
  );
};

export default Login;
