import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [friends, setFriends] = useState([]);
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    async function getSavedFriends() {
      const res = await axios.get("/api/friends");
      setFriends(res.data);
    }
    getSavedFriends();
  }, []);

  function addFriend() {
    const friend = {};
    friend.picture = picture;
    friend.name = name;

    const newFriends = [...friends];
    newFriends.push(friend);

    setFriends(newFriends);
    console.log(newFriends);
    setPicture("");
    setName("");
  }

  const friendInfo = friends.map((friend) => {
    return (
      <div key={friend.name}>
        <img
          src={friend.picture}
          alt={`${friend.name}-picture`}
          key={`${friend.name}-picture`}
          height="200px"
        />
        <span>{friend.name}</span>
      </div>
    );
  });

  return (
    <div>
      <label htmlFor="pic-url">Picture:</label>
      <input
        id="pic-url"
        key="pic-url"
        type="text"
        onChange={(evt) => setPicture(evt.target.value)}
      />
      <label htmlFor="friend-name">Name:</label>
      <input
        id="friend-name"
        key="friend-name"
        type="text"
        onChange={(evt) => setName(evt.target.value)}
      />
      <button key="add-friend" onClick={addFriend}>
        Add Friend
      </button>
      {friendInfo}
    </div>
  );
}
