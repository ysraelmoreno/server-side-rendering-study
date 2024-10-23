import React, { useState } from "react";

function Listing() {
  const [state, setState] = useState(false);
  return (
    <div>
      <nav>
        <ul>
          <li>
            <a href="/listing">Listing</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
        </ul>
      </nav>
      <h1>
        Hello to the Listing page, server side rendering with webpack running
        with the CLI!
      </h1>
      <button
        onClick={() => {
          console.log("Clicked");
          setState(!state);
        }}
      >
        {state ? "Goodbye" : "Hello"}
      </button>
    </div>
  );
}

export default Listing;
