// Login form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'Login successful') {
                window.location.href = 'home.html';
            } else {
                alert('Invalid credentials');
            }
        })
        .catch(err => alert('Error: ' + err));
    });
}

// Add student form
const studentForm = document.getElementById('studentForm');
if (studentForm) {
    studentForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const grade = document.getElementById("grade").value;
        const course = document.getElementById("course").value;

        const response = await fetch("http://localhost:3000/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, grade, course })
        });

        const result = await response.text();
        alert(result);
        studentForm.reset();
    });
}
