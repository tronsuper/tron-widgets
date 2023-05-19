import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <section className="menu">
      <Link to="/contract">transaction</Link>
    </section>
  )
}

export default Menu;