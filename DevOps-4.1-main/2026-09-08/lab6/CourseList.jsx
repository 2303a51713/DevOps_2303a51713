import React, { useState } from 'react';
import Course from './Course';

const CourseList = ({ courses, onRegister, registeredCourses }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Available Courses</h2>
      <input 
        type="text" 
        placeholder="Search courses..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', marginBottom: '15px', width: '300px' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <Course 
              key={course.code} 
              course={course} 
              onRegister={onRegister} 
              isRegistered={registeredCourses.some(rc => rc.code === course.code)}
            />
          ))
        ) : (
          <p>No courses found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;