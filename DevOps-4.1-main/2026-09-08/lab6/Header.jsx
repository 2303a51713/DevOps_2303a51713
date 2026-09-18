import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1>University Name</h1>
      <nav>
        <a href="#home" style={styles.navLink}>Home</a>
        <a href="#courses" style={styles.navLink}>Courses</a>
      </nav>
    </header>
  );
};

const styles = {
  header: { background: '#282c34', color: 'white', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  navLink: { color: 'white', margin: '0 10px', textDecoration: 'none' }
};

export default Header;