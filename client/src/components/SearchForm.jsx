import React from "react";
import { useState, useRef } from "react";

const SearchForm = () => {

  const [userName, setUserName] = useState("");
  const [followers, setFollowers] = useState("");
  const [message, setMessage] = useState("Profile Name");

  const ref = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    //alert(ref.current.value);
    
    fetch("/search/"+ref.current.value)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.userName +" " + data.followers)
        setMessage("")
        setUserName(data.userName)
        setFollowers(data.followers)
        
      });

  };


  return (
    <>
      <div className="introText">Please enter Steam ID or workshop link</div>
      <div className="searchContainer">
        <div className="profileName">
          <span value={message}>{message}</span>
          <a value={userName}>{userName}</a>
        </div>
        <div>
          <form className="form-container" onSubmit={handleSubmit}>
            <input name="searchQuery" type="text" placeholder="Search for user ID..." className="input-text" ref={ref}/>
            <button className="input-submit">Search</button>
          </form>
        </div>
        <p value={followers}>{followers} Followers</p>
      </div>
    </>
  );
};
export default SearchForm;