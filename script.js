var selectedRow = null;

// show alert
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#student");
    container.insertBefore(div, form);

    // Menghilangkan alert setelah 3 detik
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// clear fields
function clearFields() {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rollNo").value = "";
}

// tambah atau edit data
document.querySelector("#student").addEventListener("submit", (e) => {
    e.preventDefault();

    // mengambil nilai form
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rollNo = document.querySelector("#rollNo").value;

    // validasi
    if (firstName === "" || lastName === "" || rollNo === "") {
        showAlert("Please fill in all fields", "danger");
    } else {
        if (selectedRow == null) {
            const list = document.querySelector(".student-list");
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${rollNo}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                </td>
            `;
            list.appendChild(row);
            showAlert("Student Added", "success");
        } else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rollNo;
            showAlert("Student Info Updated", "info");
        }

        clearFields();
        selectedRow = null;
    }
});

// edit data
document.querySelector(".student-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("edit")) {
        selectedRow = e.target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollNo").value = selectedRow.children[2].textContent;
    }
});

// delete data
document.querySelector(".student-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
    }
});
