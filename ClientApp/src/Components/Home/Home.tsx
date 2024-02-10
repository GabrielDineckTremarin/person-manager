import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center">Welcome to My Contact App</h2>
      <p className="lead text-center">
        This is a simple application to manage contacts. Feel free to explore and manage your contacts efficiently.
      The main goal of this practice was not only to build a contact list but also to create a CRUD application, aiming to practice and improve my programming skills.
      </p>
      <p className='text-center lead'>
      Navigate to the 'Contacts' option in the navbar to view the contact list, and explore other sections of the app from there.      </p>
    </div>
  );
};

export default Home;
