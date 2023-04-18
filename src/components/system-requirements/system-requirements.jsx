import React from "react";

function SystemRequirements({ name, html }) {
  return (
    <div>
      <h2>System requirements for {name}</h2>
      <div dangerouslySetInnerHTML={html}></div>
    </div>
  );
}

export default SystemRequirements;
