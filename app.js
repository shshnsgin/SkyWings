// app.js - JavaScript for SkyWings Airline Booking

let isLoggedIn = false;
let userName = '';
let isLoginMode = true;

// Open Modal
function openModal() {
    const modal = document.getElementById('authModal');
    modal.classList.add('active');
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('active');
}

// Toggle between Login and Sign Up
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    const nameGroup = document.getElementById('nameGroup');
    const modalTitle = document.getElementById('modalTitle');
    const authBtnText = document.getElementById('authBtnText');
    const toggleText = document.getElementById('toggleText');

    if (isLoginMode) {
        nameGroup.style.display = 'none';
        modalTitle.textContent = 'С возвращением';
        authBtnText.textContent = 'Логин';
        toggleText.textContent = "Нету профиля? Зарегистрироваться";
    } else {
        nameGroup.style.display = 'block';
        modalTitle.textContent = 'Создать профиль';
        authBtnText.textContent = 'Зарегистрироваться';
        toggleText.textContent = 'Есть профиль? Войти';
    }
}

// Handle Authentication
function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    if (!email || !password) {
        alert('Please fill in all required fields');
        return;
    }

    if (!isLoginMode && !name) {
        alert('Please enter your full name');
        return;
    }

    // Simulate authentication
    userName = isLoginMode ? email.split('@')[0] : name;
    isLoggedIn = true;

    // Update UI
    const authSection = document.getElementById('authSection');
    authSection.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="user-greeting">Hello, ${userName}!</span>
            <button class="auth-btn logout-btn" onclick="handleLogout()">Logout</button>
        </div>
    `;

    // Add entrance animation
    authSection.style.animation = 'fadeIn 0.5s';

    // Close modal
    closeModal();

    // Clear inputs
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('name').value = '';

    // Show success message
    showNotification('Successfully logged in!', 'success');
}

// Handle Logout
function handleLogout() {
    isLoggedIn = false;
    userName = '';

    const authSection = document.getElementById('authSection');
    authSection.innerHTML = `
        <button class="auth-btn" onclick="openModal()">Login / Sign Up</button>
    `;

    authSection.style.animation = 'fadeIn 0.5s';
    showNotification('Successfully logged out!', 'info');
}

// Search Flights
function searchFlights() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const departure = document.getElementById('departure').value;
    const returnDate = document.getElementById('return').value;
    const passengers = document.getElementById('passengers').value;
    const flightClass = document.getElementById('class').value;

    if (!from || !to || !departure) {
        alert('Please fill in departure city, arrival city, and departure date');
        return;
    }

    // Simulate search with loading
    const searchBtn = document.querySelector('.search-btn');
    const originalText = searchBtn.innerHTML;
    searchBtn.innerHTML = '<span class="loading"></span> Searching...';
    searchBtn.disabled = true;

    setTimeout(() => {
        searchBtn.innerHTML = originalText;
        searchBtn.disabled = false;

        const message = `Searching for flights:\n\nFrom: ${from}\nTo: ${to}\nDeparture: ${departure}\n${returnDate ? 'Return: ' + returnDate : 'One-way'}\nPassengers: ${passengers}\nClass: ${flightClass}`;
        alert(message);

        showNotification('Flight search completed!', 'success');
    }, 2000);
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#667eea'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 2000;
        animation: slideDown 0.5s, fadeIn 0.5s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeInUp 0.5s reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('authModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Add scroll animations
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.dest-card, .feature-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Initialize - set minimum date to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('departure').setAttribute('min', today);
document.getElementById('return').setAttribute('min', today);

// Add hover effects to destination cards
document.addEventListener('DOMContentLoaded', function() {
    const destCards = document.querySelectorAll('.dest-card');
    destCards.forEach(card => {
        card.addEventListener('click', function() {
            const city = this.querySelector('h3').textContent;
            const price = this.querySelector('.price').textContent;
            
            // Auto-fill search with destination
            document.getElementById('to').value = city;
            
            // Scroll to search
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            showNotification(`Selected destination: ${city} (${price})`, 'info');
        });
    });
});

console.log('SkyWings Airline Booking System Loaded! ✈️');