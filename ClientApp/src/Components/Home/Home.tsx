import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center">Welcome to My Contact App</h2>
      <p style={{textAlign:'justify'}} className="lead">
        This is a simple application to manage contacts.
      The main goal of this practice was not only to build a contact list but also to create a CRUD application, aiming to practice and improve my programming skills.      Navigate to the 'Contacts' option in the navbar to view the contact list, and explore other sections of the app from there.  

      </p>


      <p style={{textAlign:'justify'}} className="lead">
      <strong>Note: </strong>Unfortunately, the backend of the app is not published yet, so you will not be able to perform the CRUD operations, but if you want to visit my github page and check the repository out, click <a href="https://github.com/GabrielDineckTremarin/person-manager" target='_blank'>here</a>.  
      </p>
    </div>
  );
};

export default Home;
