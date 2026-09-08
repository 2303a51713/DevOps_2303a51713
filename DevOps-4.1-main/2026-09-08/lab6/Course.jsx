import React from 'react';

const Course = ({ course, onRegister, isRegistered }) => {
  return (
    <div style={styles.courseCard}>
      <h3>{course.name}</h3>
      <p><strong>Code:</strong> {course.code}</p>
      <p><strong>Credits:</strong> {course.credits}</p>
      <button 
        onClick={() => onRegister(course)} 
        disabled={isRegistered}
        style={isRegistered ? styles.disabledBtn : styles.btn}
      >
        {isRegistered ? 'Registered' : 'Register'}
      </button>
    </div>
  );
};

const styles = {
  courseCard: { border: '1px solid #ddd', padding: '15px', margin: '10px', borderRadius: '5px', width: '250px' },
  btn: { background: '#007bff', color: 'white', border: 'none', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px' },
  disabledBtn: { background: '#6c757d', color: 'white', border: 'none', padding: '8px 12px', cursor: 'not-allowed', borderRadius: '4px' }
};

export default Course;