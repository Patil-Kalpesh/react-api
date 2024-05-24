import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [myData, setMyData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((resp) => setMyData(resp.data));
  }, []);

  // Filter data based on search query
  const filteredData = myData.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to delete a user by ID
  const deleteUser = (id) => {
    setMyData(myData.filter(user => user.id !== id));
  };

  return (
    <div>
      <h1 className="mx">Axios Fetch API</h1>
      <div className="card">
        <input
          className='input-text'
          type="text"
          value={searchQuery}
          placeholder='search data'
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
        />
        <button
          className='btn'
          onClick={() => setSearchQuery("")} // Reset button functionality
        >
          Reset
        </button>
        <table>
          <thead>
            <tr>
              <th>Sr. no</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Geo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((post) => {
              const { id, name, username, email, address } = post;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{address.street}, {address.suite}, {address.city}, {address.zipcode}</td>
                  <td>{address.geo.lat}, {address.geo.lng}</td>
                  <td><button onClick={() => deleteUser(id)}>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
