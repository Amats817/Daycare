//sign in & out
function signIn(id) {
    const time = new Date().toLocaleTimeString();
    document.getElementById(`status-${id}`).innerHTML = '<span class="present">&#10004;</span>'; // Green checkmark
    document.getElementById(`signin-${id}`).innerHTML = `<span class="time">Signed in at ${time}</span>`;
    document.querySelector(`tr:nth-child(${id}) td:nth-child(4) button`).disabled = false;
    document.querySelector(`tr:nth-child(${id}) td:nth-child(3) button`).disabled = true;
}

function signOut(id) {
    const time = new Date().toLocaleTimeString();
    document.getElementById(`signout-${id}`).innerHTML = `<span class="time">Signed out at ${time}</span>`;
    document.querySelector(`tr:nth-child(${id}) td:nth-child(3) button`).disabled = false;
    document.querySelector(`tr:nth-child(${id}) td:nth-child(4) button`).disabled = true;
}

//date !!these are hardcoded!!
let currentDate = new Date();

function updateDateDisplay() {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("current-date").textContent = currentDate.toLocaleDateString(undefined, dateOptions);
}

function previousDay() {
    currentDate.setDate(currentDate.getDate() - 1);
    updateDateDisplay();
}

function nextDay() {
    currentDate.setDate(currentDate.getDate() + 1);
    updateDateDisplay();
}

// Initialize with today's date on page load
document.addEventListener('DOMContentLoaded', () => {
    updateDateDisplay();
});
