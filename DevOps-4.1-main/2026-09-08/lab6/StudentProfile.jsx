import React from 'react';

const StudentProfile = ({ student }) => {
  return (
    <div style={styles.profileCard}>
      <h2>Student Profile</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Roll No:</strong> {student.rollNo}</p>
      <p><strong>Branch:</strong> {student.branch}</p>
    </div>
  );
};

const styles = {
  profileCard: { border: '1px solid #ccc', padding: '15px', margin: '20px 0', borderRadius: '5px' }
};

export default StudentProfile;