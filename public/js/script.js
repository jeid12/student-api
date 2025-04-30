document.addEventListener("DOMContentLoaded", () => {
    const studentList = document.getElementById("student-list");
    const form = document.getElementById("student-form");
  
    const fetchStudents = async () => {
      const res = await fetch("'http://localhost:5000/students'");
      const data = await res.json();
      studentList.innerHTML = "";
      data.forEach(student => {
        const li = document.createElement("li");
        li.innerHTML = `
          ${student.name} - ${student.email} (${student.course})
          <button onclick="deleteStudent(${student.id})">Delete</button>
        `;
        studentList.appendChild(li);
      });
    };
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const course = document.getElementById("course").value;
  
      await fetch("'http://localhost:5000/students'", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, course })
      });
  
      form.reset();
      fetchStudents();
    });
  
    window.deleteStudent = async (id) => {
      await fetch(`'http://localhost:5000/students'/${id}`, { method: "DELETE" });
      fetchStudents();
    };
  
    fetchStudents();
  });
  