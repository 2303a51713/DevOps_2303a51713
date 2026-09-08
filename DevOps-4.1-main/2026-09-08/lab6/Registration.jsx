import React from 'react';

const Registration = ({ registeredCourses, onRemove }) => {
  return (
    <div style={styles.container}>
      <h2>Registered Courses</h2>
      
      {/* Conditional Rendering */}
      {registeredCourses.length === 0 ? (
        <p style={{ color: 'red' }}>No courses are registered yet.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {registeredCourses.map(course => (
            <li key={course.code} style={styles.listItem}>
              <span>{course.name} ({course.code}) - {course.credits} Credits</span>
              <button onClick={() => onRemove(course.code)} style={styles.removeBtn}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: { marginTop: '30px', padding: '15px', border: '1px solid #17a2b8', borderRadius: '5px', backgroundColor: '#e0f7fa' },
  listItem: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', background: 'white', padding: '10px', borderRadius: '4px' },
  removeBtn: { background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }
};

export default Registration;