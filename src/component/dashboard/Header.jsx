import React from 'react'

export default function Header({ header } ) {
  return (
    <div>
      <header className="dashboard-header">
        <h4>{header}</h4>
      </header>
    </div>
  );
}
