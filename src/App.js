import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteuser, updateUser } from "./features/users";
import { useState, useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.value);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [updateUsername, setUpdateUsername] = useState("");
  // console.log(name, username);

  useEffect(() => {
    const storedUsername = localStorage.getItem(username);
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, []);

  const handleUserNameUpdate = () => {
    const newUserName = updateUsername;
    localStorage.setItem(username, newUserName);
  };
  return (
    <div className="App">
      <h2>Users Manager</h2>
      <div className="addUser">
        <input
          type="text"
          placeholder="Name..."
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter a username"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          // value={username}
        />
        <button
          onClick={() => {
            dispatch(
              addUser({
                id: userList[userList.length - 1].id + 1, // id should be last users id + 1
                name,
                username,
              })
            );
          }}
        >
          Add User
        </button>
      </div>
        
      <div>From the storage - <b>{username}</b> </div>

      <div className="displayUsers">
        {userList.map((user) => {
          return (
            <div className="box" key={user.id}>
              <h3>
                <span>Username -</span>
                {user.name}
               
              </h3>
              <h3>
                <span>Name -</span>
                {user.username}
                {/* {username} */}
              </h3>
              <input
                type="text"   
                placeholder="Edit your username"
                // value={username}
                onChange={(event) => {
                  setUpdateUsername(event.target.value);
                  handleUserNameUpdate();
                }}
              />
              <button
                onClick={() => {
                  dispatch(
                    updateUser({ id: user.id, username: updateUsername })
                  );
                
                }}
              >
                Update
              </button>
              <button onClick={() => dispatch(deleteuser({ id: user.id }))}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
