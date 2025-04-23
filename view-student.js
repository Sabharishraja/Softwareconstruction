window.onload = function() {
    fetch('http://localhost:3000/students')
        .then(response => response.json())
        .then(data => {
            const studentListDiv = document.getElementById('student-list');
            if (data.students && data.students.length > 0) {
                let studentHTML = '<ul>';
                data.students.forEach(student => {
                    studentHTML += `
                        <li>
                            Name: ${student.name}, Grade: ${student.grade}, Course: ${student.course} 
                            <button onclick="deleteStudent(${student.id})">Delete</button>
                        </li>
                    `;
                });
                studentHTML += '</ul>';
                studentListDiv.innerHTML = studentHTML;
            } else {
                studentListDiv.innerHTML = 'No students found.';
            }
        });
};

function deleteStudent(id) {
    fetch(`http://localhost:3000/delete-student/${id}`, {
        method: 'DELETE'
    }).then(response => response.json())
      .then(data => {
          alert(data.message);
          window.location.reload();
      });
}
