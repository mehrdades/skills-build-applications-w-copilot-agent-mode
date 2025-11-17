import React, { useEffect, useState } from 'react';
const API_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched workouts:', results);
      });
  }, []);
  return (
    <div>
      <h2 className="mb-4">Workouts</h2>
      <div className="card mb-4">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((w, i) => (
                <tr key={i}>
                  <td>{w.name}</td>
                  <td>{w.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Workouts;
