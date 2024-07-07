const baseUrl = 'http://localhost:3030/jsonstore/collections/students';
const firstNameEl = document.querySelector('input[name="firstName"]');
const lastNameEl = document.querySelector('input[name="lastName"]');
const facultyNumberEl = document.querySelector('input[name="facultyNumber"]');
const gradeEl = document.querySelector('input[name="grade"]');
 
const form = document.getElementById('form');
form.addEventListener('submit', onSubmit);
 
const tbody = document.querySelector("#results tbody");
 
function onSubmit(e) {
    e.preventDefault();
 
    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');
 
    postStudentData({ firstName, lastName, facultyNumber, grade });
}
 
async function postStudentData(data) {
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName: data.firstName, lastName: data.lastName, facultyNumber: data.facultyNumber, grade: data.grade })
        });
 
        await response.json();
 
        loadStudents();
    } catch (err) {
        alert(err);
    }
}
 
async function loadStudents() {
    try {
        tbody.innerHTML = '';
 
        const response = await fetch(baseUrl);
        const data = await response.json();
 
        if (!response.ok) {
            throw new Error(data.message);
        }
 
        Object.values(data).forEach(person => {
            const currPerson = createRow(person);
            tbody.appendChild(currPerson);
        });
 
        firstNameEl.value = '';
        lastNameEl.value = '';
        facultyNumberEl.value = '';
        gradeEl.value = '';
    } catch (err) {
        alert(err.message);
    }
}
 
function createRow(data) {
    const tr = document.createElement('tr');
 
    const tdFirstName = document.createElement('td');
    tdFirstName.textContent = data.firstName;
    const tdLastName = document.createElement('td');
    tdLastName.textContent = data.lastName;
    const tdfacultyNumber = document.createElement('td');
    tdfacultyNumber.textContent = data.facultyNumber;
    const tdGrade = document.createElement('td');
    tdGrade.textContent = data.grade;
 
    tr.appendChild(tdFirstName);
    tr.appendChild(tdLastName);
    tr.appendChild(tdfacultyNumber);
    tr.appendChild(tdGrade);
 
    return tr;
}