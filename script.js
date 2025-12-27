const DEFAULT_PASSWORD = "CBIT123";
let requestedBooks = [];
let isDark = true;

const books = [
    { name: "Python Programming", author: "Guido", status: "Available", img: "python.jpg" },
    { name: "Data Structures", author: "Weiss", status: "Available", img: "ds.jpg" },
    { name: "DBMS", author: "Ramakrishnan", status: "Available", img: "dbms.png" },
    { name: "AI", author: "Russell", status: "Available", img: "ai.jpg" },
    { name: "ML", author: "Mitchell", status: "Available", img: "ML.jpg" },
    { name: "DL", author: "Goodfellow", status: "Available", img: "DL.jpg" },
    { name: "NLP", author: "Jurafsky", status: "Available", img: "NLP.jpg" },
    { name: "MERN Stack", author: "Ullman", status: "Available", img: "MERN.jpg" },
    { name: "Cloud Computing", author: "Buyya", status: "Available", img: "CLOUDCOMPUTING.jpg" },
    { name: "Operating Systems", author: "Silberschatz", status: "Available", img: "OS.jpg" },
    { name: "C Programming", author: "Kernighan", status: "Available", img: "C.jpg" },
    { name: "Java Programming", author: "Gosling", status: "Available", img: "JAVA.jpg" }
];

/* LOGIN */
function login() {
    const email = userId.value;
    const pass = password.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        loginError.innerText = "Enter valid email";
        return;
    }

    if (pass !== DEFAULT_PASSWORD) {
        loginError.innerText = "Invalid password";
        return;
    }

    window.location.href = "library.html";
}

/* ENTER KEY LOGIN */
document.addEventListener("keydown", e => {
    if (e.key === "Enter" && document.getElementById("loginError")) {
        login();
    }
});

/* LIBRARY INIT */
if (document.getElementById("bookContainer")) {
    showAvailable();
}

/* BOOKS */
function loadBooks(list) {
    bookContainer.innerHTML = list.map(b => `
        <div class="book-card"
             data-title="${b.name}"
             data-author="${b.author}"
             data-image="${b.img}">
             
            <img src="${b.img}">
            <h3>${b.name}</h3>
            <p>${b.author}</p>
            <p class="status">${b.status}</p>
        </div>
    `).join("");

    attachBookClickEvents(); // 🔥 IMPORTANT
}
function attachBookClickEvents() {
    const cards = document.querySelectorAll(".book-card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            openModal(
                card.dataset.title,
                card.dataset.author,
                card.dataset.image
            );
        });
    });
}




function showAvailable() {
    loadBooks(books);
    requestSection.style.display = "block";
}

function showRequested() {
    requestSection.style.display = "none";

    bookContainer.innerHTML = requestedBooks.length
        ? requestedBooks.map(r => `
            <div class="book-card">
                <h3>${r.book}</h3>
                <p>Requested by: ${r.student}</p>
                <p class="status">Pending</p>
            </div>
        `).join("")
        : `<p style="text-align:center;margin-top:30px;">No books requested</p>`;
}

function searchBooks() {
    const t = document.querySelector(".search-bar").value.toLowerCase();
    loadBooks(books.filter(b => b.name.toLowerCase().includes(t)));
}

function submitRequest() {
    if (reqStudent.value && reqBook.value) {
        requestedBooks.push({
            student: reqStudent.value,
            book: reqBook.value
        });

        alert("Request submitted");
        reqStudent.value = "";
        reqBook.value = "";
    }
}

/* ENTER KEY REQUEST */
document.addEventListener("keydown", e => {
    if (
        e.key === "Enter" &&
        document.getElementById("requestSection")?.style.display !== "none"
    ) {
        submitRequest();
    }
});

/* THEME */
function toggleTheme() {
    document.body.classList.toggle("light-theme");
    isDark = !isDark;
    document.querySelector(".theme-toggle").innerText = isDark ? "🌙" : "☀️";
}

/* LOGOUT */
function logout() {
    window.location.href = "login.html";
}

function openModal(title, author, image) {
  document.getElementById("modalBookTitle").innerText = title;
  document.getElementById("modalBookAuthor").innerText = "Author: " + author;
  document.getElementById("modalBookImage").src = image;
  document.getElementById("bookModal").style.display = "block";
}

function closeModal() {
  document.getElementById("bookModal").style.display = "none";
}
function togglePassword() {
    const password = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (password.type === "password") {
        password.type = "text";
        eyeIcon.textContent = "🙈";
    } else {
        password.type = "password";
        eyeIcon.textContent = "👁️";
    }
}

function toggleEyeIcon() {
    const password = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (password.value.length > 0) {
        eyeIcon.style.display = "block";
    } else {
        eyeIcon.style.display = "none";
        password.type = "password";
        eyeIcon.textContent = "👁️";
    }
}

