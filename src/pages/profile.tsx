import React, { useState } from "react";

function App({ name }: { name?: string }) {
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
      <h1>Hello, server side rendering with webpack running with the CLI!</h1>
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

export default App;
