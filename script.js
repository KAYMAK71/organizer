// DOM Elements
let loginScreen = document.getElementById('loginScreen');
let registerScreen = document.getElementById('registerScreen');
let registerLink = document.getElementById('registerLink');
let loginLink = document.getElementById('loginLink');
let registerForm = document.getElementById('registerForm');
let loginForm = document.getElementById('loginForm');

// User Management
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;
let performanceStats = {
    callsHandled: 0,
    averageResponseTime: 0,
    successfulDispatches: 0,
    criticalIncidents: 0
};

// Show/Hide Screen Functions
function showRegister(e) {
    e.preventDefault();
    loginScreen.style.display = 'none';
    registerScreen.style.display = 'block';
}

function showLogin(e) {
    e.preventDefault();
    registerScreen.style.display = 'none';
    loginScreen.style.display = 'block';
}

// Event Listeners
registerLink.addEventListener('click', showRegister);
loginLink.addEventListener('click', showLogin);

// Registration Handler
function handleRegister(e) {
    e.preventDefault();
    const operatorId = document.getElementById('newOperatorId').value;
    const fullName = document.getElementById('fullName').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (users.some(user => user.operatorId === operatorId)) {
        alert('Operator ID already exists!');
        return;
    }

    users.push({
        operatorId,
        fullName,
        password,
        stats: {
            callsHandled: 0,
            averageResponseTime: 0,
            successfulDispatches: 0,
            criticalIncidents: 0
        }
    });

    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Please login.');
    showLogin(e);
}

// Pre-defined operator credentials
const authorizedOperators = [
    {
        operatorId: "NYPD-4425",
        password: "10-1984DC",
        fullName: "Det. Sarah Martinez",
        badge: "4425",
        precinct: "13th Precinct",
        shift: "Alpha",
        stats: {
            callsHandled: 142,
            averageResponseTime: 180,
            successfulDispatches: 138,
            criticalIncidents: 28
        }
    },
    {
        operatorId: "NYPD-6612",
        password: "13-1992QB",
        fullName: "Sgt. Michael O'Connor",
        badge: "6612",
        precinct: "13th Precinct",
        shift: "Beta",
        stats: {
            callsHandled: 167,
            averageResponseTime: 165,
            successfulDispatches: 159,
            criticalIncidents: 34
        }
    }
];

// Initialize elements

// Login handler
function handleLogin(e) {
    e.preventDefault();
    const operatorId = document.getElementById('operatorId').value;
    const password = document.getElementById('password').value;

    const operator = authorizedOperators.find(op => 
        op.operatorId === operatorId && op.password === password
    );
    
    if (operator) {
        currentUser = operator;
        errorMessage.style.display = 'none';
        loginScreen.style.display = 'none';
        desktop.style.display = 'block';
        initializeDesktop();
        document.getElementById('operatorInfo').textContent = 
            `Operator: ${operator.fullName} | Badge: ${operator.badge} | ${operator.precinct}`;
    } else {
        errorMessage.style.display = 'block';
        document.getElementById('password').value = ''; // Clear password field
    }
}

// Event listeners
loginForm.addEventListener('submit', handleLogin);

// Desktop initialization
function initializeDesktop() {
    updateTime();
    setInterval(updateTime, 1000);
    initializeMap();
    loadScenarios();
    updateStats();
}

// Simplified login handler
function handleLogin(e) {
    e.preventDefault();
    const operatorId = document.getElementById('operatorId').value;
    const password = document.getElementById('password').value;

    const operator = authorizedOperators.find(op => 
        op.operatorId === operatorId && op.password === password
    );
    
    if (operator) {
        currentUser = operator;
        initializeDesktop();
        document.getElementById('operatorInfo').textContent = 
            `Operator: ${operator.fullName} | Badge: ${operator.badge} | ${operator.precinct}`;
    } else {
        alert('Invalid credentials! Please use your NYPD Operator ID and password.');
    }
}
// Add form submit listeners
registerForm.addEventListener('submit', handleRegister);
loginForm.addEventListener('submit', handleLogin);

// Scenarios
const scenarios = [
    {
        id: 1,
        type: "ROBBERY",
        location: "1234 Broadway Ave",
        description: "Armed robbery in progress at convenience store",
        coordinates: [40.7589, -73.9851],
        urgency: "HIGH",
        requiredUnits: ["patrol", "tactical"]
    },
    {
        id: 2,
        type: "MEDICAL",
        location: "Central Park West",
        description: "Elderly person collapsed, possible heart attack",
        coordinates: [40.7829, -73.9654],
        urgency: "HIGH",
        requiredUnits: ["ambulance", "patrol"]
    },
    {
        id: 3,
        type: "DISTURBANCE",
        location: "Times Square",
        description: "Large group fighting outside nightclub",
        coordinates: [40.7580, -73.9855],
        urgency: "MEDIUM",
        requiredUnits: ["patrol"]
    },
    {
        id: 4,
        type: "TRAFFIC",
        location: "5th Avenue",
        description: "Multi-vehicle accident with injuries",
        coordinates: [40.7549, -73.9840],
        urgency: "HIGH",
        requiredUnits: ["patrol", "ambulance", "fire"]
    },
    {
        id: 5,
        type: "DOMESTIC",
        location: "Queens Boulevard",
        description: "Domestic dispute, possible weapons involved",
        coordinates: [40.7282, -73.7949],
        urgency: "HIGH",
        requiredUnits: ["patrol", "tactical"]
    }
];

// Police Units
const units = [
    { id: "P1", type: "patrol", status: "available", location: [40.7589, -73.9851] },
    { id: "P2", type: "patrol", status: "available", location: [40.7829, -73.9654] },
    { id: "T1", type: "tactical", status: "available", location: [40.7580, -73.9855] },
    { id: "A1", type: "ambulance", status: "available", location: [40.7549, -73.9840] },
    { id: "F1", type: "fire", status: "available", location: [40.7282, -73.7949] }
];

// Event Listeners
document.getElementById('registerLink').addEventListener('click', showRegister);
document.getElementById('loginLink').addEventListener('click', showLogin);
document.getElementById('registerForm').addEventListener('submit', handleRegister);
document.getElementById('loginForm').addEventListener('submit', handleLogin);

// Registration Handler
function handleRegister(e) {
    e.preventDefault();
    const operatorId = document.getElementById('newOperatorId').value;
    const fullName = document.getElementById('fullName').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (users.some(user => user.operatorId === operatorId)) {
        alert('Operator ID already exists!');
        return;
    }

    users.push({
        operatorId,
        fullName,
        password,
        stats: {
            callsHandled: 0,
            averageResponseTime: 0,
            successfulDispatches: 0,
            criticalIncidents: 0
        }
    });

    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Please login.');
    showLogin();
}

// Login Handler
function handleLogin(e) {
    e.preventDefault();
    const operatorId = document.getElementById('operatorId').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.operatorId === operatorId && u.password === password);
    
    if (user) {
        currentUser = user;
        initializeDesktop();
    } else {
        alert('Invalid credentials!');
    }
}

// UI Toggle Functions
function showRegister() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('registerScreen').style.display = 'block';
}

function showLogin() {
    document.getElementById('registerScreen').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'block';
}

// Desktop Initialization
function initializeDesktop() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('desktop').style.display = 'block';
    initializeMap();
    updateTime();
    setInterval(updateTime, 1000);
    loadScenarios();
    updateStats();
}

// Map Initialization
let map;
function initializeMap() {
    map = L.map('map').setView([40.7589, -73.9851], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add unit markers
    units.forEach(unit => {
        L.marker(unit.location)
            .bindPopup(`Unit ${unit.id} - ${unit.type.toUpperCase()}`)
            .addTo(map);
    });
}

// Window Management
function openWindow(windowType) {
    document.getElementById(windowType + 'Window').style.display = 'block';
}

function closeWindow(windowType) {
    document.getElementById(windowType + 'Window').style.display = 'none';
}

function openFile(fileType) {
    if (fileType === 'readme') {
        document.getElementById('readmeWindow').style.display = 'block';
        document.getElementById('readmeContent').innerHTML = `
 <h2>NYPD Dispatch Simulator Instructions</h2>
            <p>Welcome to the NYPD Dispatch Simulator. Your role is to manage emergency calls and coordinate police units effectively.</p>
            <h3>Scenarios:</h3>
            <ul>
                <li>Robbery in Progress: High priority, requires immediate tactical response</li>
                <li>Medical Emergency: Coordinate with medical units</li>
                <li>Public Disturbance: Manage crowd control</li>
                <li>Traffic Accident: Coordinate multiple emergency services</li>
                <li>Domestic Dispute: Handle sensitive situations carefully</li>
            </ul>
            <h3>Performance Metrics:</h3>
            <ul>
                <li>Response Time: Aim for under 3 minutes</li>
                <li>Resource Management: Efficient unit deployment</li>
                <li>Incident Resolution: Successful case closure</li>
            </ul>`;
    }
}

// Time Management
function updateTime() {
    const now = new Date();
    document.getElementById('currentTime').textContent = now.toLocaleTimeString();
    document.getElementById('operatorInfo').textContent = 
        `Operator: ${currentUser.fullName} | Status: Active`;
}

// Scenario Management
let activeScenarios = [];

function loadScenarios() {
    // Randomly select a scenario every 30-60 seconds
    setInterval(() => {
        if (activeScenarios.length < 3 && Math.random() > 0.5) {
            createNewScenario();
        }
    }, 30000);
}

function createNewScenario() {
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    const newScenario = { ...scenario, startTime: new Date(), status: 'pending' };
    activeScenarios.push(newScenario);
    updateCallsList();
    playAlertSound(scenario.urgency);
}

function updateCallsList() {
    const callsContainer = document.getElementById('activeCalls');
    callsContainer.innerHTML = '';

    activeScenarios.forEach(scenario => {
        const callCard = document.createElement('div');
        callCard.className = `call-card ${scenario.urgency.toLowerCase()}`;
        callCard.innerHTML = `
            <h3>${scenario.type}</h3>
            <p>Location: ${scenario.location}</p>
            <p>Status: ${scenario.status}</p>
            <p>Urgency: ${scenario.urgency}</p>
            <button onclick="handleCall(${scenario.id})">Handle Call</button>
        `;
        callsContainer.appendChild(callCard);
    });
}

function handleCall(scenarioId) {
    const scenario = activeScenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    const availableUnits = units.filter(unit => 
        scenario.requiredUnits.includes(unit.type) && unit.status === 'available'
    );

    if (availableUnits.length >= scenario.requiredUnits.length) {
        // Dispatch units
        availableUnits.slice(0, scenario.requiredUnits.length).forEach(unit => {
            unit.status = 'dispatched';
            updateUnitMarker(unit, scenario.coordinates);
        });

        // Update scenario status
        scenario.status = 'handled';
        scenario.responseTime = (new Date() - scenario.startTime) / 1000; // in seconds

        // Update performance stats
        updatePerformanceStats(scenario);

        // Remove from active scenarios after a delay
        setTimeout(() => {
            activeScenarios = activeScenarios.filter(s => s.id !== scenarioId);
            updateCallsList();
            // Return units to available status
            availableUnits.forEach(unit => {
                unit.status = 'available';
                updateUnitMarker(unit, unit.location);
            });
        }, 10000);

    } else {
        alert('Not enough available units for this scenario!');
    }
}

function updateUnitMarker(unit, newLocation) {
    // Update unit marker on map
    const marker = L.marker(newLocation)
        .bindPopup(`Unit ${unit.id} - ${unit.type.toUpperCase()} - ${unit.status}`)
        .addTo(map);
    
    // Animate movement
    if (unit.marker) {
        map.removeLayer(unit.marker);
    }
    unit.marker = marker;
}

function updatePerformanceStats(scenario) {
    performanceStats.callsHandled++;
    performanceStats.averageResponseTime = 
        (performanceStats.averageResponseTime * (performanceStats.callsHandled - 1) + 
        scenario.responseTime) / performanceStats.callsHandled;
    
    if (scenario.status === 'handled') {
        performanceStats.successfulDispatches++;
    }
    
    if (scenario.urgency === 'HIGH') {
        performanceStats.criticalIncidents++;
    }

    updateStats();
}

function updateStats() {
    const statsContainer = document.getElementById('performanceStats');
    if (!statsContainer) return;

    statsContainer.innerHTML = `
        <div class="stats-container">
            <div class="stat-card">
                <h3>Calls Handled</h3>
                <div class="stat-value">${performanceStats.callsHandled}</div>
            </div>
            <div class="stat-card">
                <h3>Average Response Time</h3>
                <div class="stat-value">${performanceStats.averageResponseTime.toFixed(1)}s</div>
            </div>
            <div class="stat-card">
                <h3>Successful Dispatches</h3>
                <div class="stat-value">${performanceStats.successfulDispatches}</div>
            </div>
            <div class="stat-card">
                <h3>Critical Incidents</h3>
                <div class="stat-value">${performanceStats.criticalIncidents}</div>
            </div>
        </div>
    `;
}

function playAlertSound(urgency) {
    // Create and play alert sound based on urgency
    const audio = new Audio();
    audio.src = urgency === 'HIGH' ? 'high-priority.mp3' : 'standard-alert.mp3';
    audio.play().catch(err => console.log('Audio playback prevented:', err));
}

// Make windows draggable
const windows = document.querySelectorAll('.window');
windows.forEach(makeWindowDraggable);

function makeWindowDraggable(element) {
    const header = element.querySelector('.window-header');
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}