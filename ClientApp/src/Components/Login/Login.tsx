import React, { useState, useEffect } from 'react';

const Login: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Remove event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  
  return (
    <div 
    className={windowWidth < 1000 
      ? 
    windowWidth < 500 ? "container mt-5 w-100" : "container mt-5 w-50"
    : 
    "container mt-5 w-25"}>
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
