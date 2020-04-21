import React from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [newName, setNewName] = React.useState("");
  const [allNames, setAllName] = React.useState([]);

  const getLeaderboard = () =>
    axios.get("http://localhost:3000/leaderboard").then((res) => {
      const dbNames = res.data;
      setAllName(dbNames);
      return null;
    });

  React.useEffect(() => {
    const unsubscribe = getLeaderboard();
    return () => unsubscribe();
  }, []);
  const handleSubmit = () => {
    axios.post("http://localhost:3000/players", { name: newName }).then(() => {
      setNewName("");
      return getLeaderboard();
    });
  };
  const handleDelete = (playerId) => () => {
    console.log("playerId", playerId);
    axios.delete(`http://localhost:3000/players/${playerId}`).then((res) => {
      console.log(res);
      return getLeaderboard();
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <h2>Simple Registration</h2>
        <p>Add name to database and display all stats</p>
        <br />
        <form>
          <input
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </form>
        <br />
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Stats</td>
            </tr>
          </thead>
          <tbody>
            {allNames.map((x, index) => (
              <tr key={index}>
                <td>{x.name}</td>
                <td>{x.stats}</td>
                <td>
                  <button onClick={handleDelete(x.playerId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
