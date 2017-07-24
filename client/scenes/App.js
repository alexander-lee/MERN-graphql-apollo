import React from 'react';

function App() {
  return (
    <div>
      <h1>Reddit</h1>
      {this.props.children}
    </div>
  );
}

export default App;
