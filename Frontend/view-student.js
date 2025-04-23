window.onload = function() {
    fetch('http://localhost:3000/students')
        .then(response => response.json())
        .then(data => {
            const studentListDiv = document.getElementById('student-list');
            if (data.students && data.students.length > 0) {
                let studentHTML = `
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Grade</th>
                                <th>Course</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                data.students.forEach(student => {
                    studentHTML += `
                        <tr>
                            <td>${student.id}</td>
                            <td>${student.name}</td>
                            <td>${student.grade}</td>
                            <td>${student.course}</td>
                            <td><button onclick="deleteStudent(${student.id})">Delete</button></td>
                        </tr>
                    `;
                });

                studentHTML += `
                        </tbody>
                    </table>
                `;

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
