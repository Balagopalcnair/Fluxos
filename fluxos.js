document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selectors ---
    const powerButton = document.getElementById('power');
    const bootScreen = document.querySelector('.boot');
    const welcomeScreen = document.querySelector('.welcome');
    const loginScreen = document.getElementById('login-screen');
    const loginForm = document.getElementById('login-screen');
    const passwordInput = document.getElementById('password-box');
    const desktop = document.getElementById('desktop');
    const taskbar = document.getElementById('taskbar');
    const clockElement = document.getElementById('clock');
    const runningAppsContainer = document.getElementById('running-apps');
    const startButton = document.getElementById('start-button');
    const startMenu = document.getElementById('start-menu');
    const shutdownBtn = document.getElementById('shutdown-btn');
    const startMenuSearch = document.querySelector('.start-menu-search');
    const startMenuTerminal = document.getElementById('start-menu-terminal');


    // App-specific elements
    const terminalIcon = document.getElementById('terminal-icon');
    const terminalWindow = document.getElementById('terminal-window');
    const terminalCloseBtn = terminalWindow.querySelector('.close-btn');
    const terminalBody = document.getElementById('terminal-body');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');

    const thisPcIcon = document.getElementById('this-pc-icon');
    const thisPcWindow = document.getElementById('this-pc-window');
    const thisPcCloseBtn = thisPcWindow.querySelector('.close-btn');
    const wallpaperSelectionContainer = thisPcWindow.querySelector('.wallpaper-selection');
    const lockedFiles = thisPcWindow.querySelectorAll('.file-locked');

    const browserIcon = document.getElementById('browser-icon');
    const browserWindow = document.getElementById('browser-window');
    const browserCloseBtn = browserWindow.querySelector('.close-btn');
    const browserNavForm = browserWindow.querySelector('.nav-form');
    const browserAddressBar = browserWindow.querySelector('.address-bar');
    const browserIframe = browserWindow.querySelector('.browser-iframe');
    const startMenuBrowser = document.getElementById('start-menu-browser');

    const contextMenu = document.getElementById('context-menu');
    const contextPropertiesBtn = document.getElementById('context-properties');
    const specsWindow = document.getElementById('specs-window');
    const specsCloseBtn = specsWindow.querySelector('.close-btn');

    const gamesIcon = document.getElementById('games-icon');
    const gamesWindow = document.getElementById('games-window');
    const gamesCloseBtn = gamesWindow.querySelector('.close-btn');

    const settingsIcon = document.getElementById('settings-icon');
    const settingsWindow = document.getElementById('settings-window');
    const startMenuSettings = document.getElementById('start-menu-settings');
    const themeColorGrid = document.getElementById('theme-color-grid');

    const devspaceIcon = document.getElementById('devspace-icon');
    const devspaceWindow = document.getElementById('devspace-window');
    const startMenuDevspace = document.getElementById('start-menu-devspace');

    const calculatorIcon = document.getElementById('calculator-icon');
    const calculatorWindow = document.getElementById('calculator-window');
    const startMenuCalculator = document.getElementById('start-menu-calculator');
    const calculatorButtons = document.querySelector('.calc-buttons');




    // --- State ---
    const CORRECT_PASSWORD = '123';
    // IMPORTANT: Make sure you have a 'wallpapers' folder with these images
    const WALLPAPERS = [
        'wallpapers/wallpaper1.jpg', // Make sure .jpg is the correct extension for your file
        'wallpapers/wallpaper2.jpg'  // Make sure .jpg is the correct extension for your file
    ];
    const THEME_COLORS = [
        '#0078d4', // Default Blue
        '#ff8c00', // Orange
        '#e81123', // Red
        '#00cc6a', // Green
        '#8e44ad', // Purple
        '#ff4081'  // Pink
    ];
    let highestZIndex = 10;

    // --- Utility Functions ---
    const showElement = (el, displayStyle = 'block') => {
        el.style.display = displayStyle;
    };

    const hideElement = (el) => {
        el.style.display = 'none';
    };

    function setWallpaper(url) {
        document.body.style.backgroundImage = `url('${url}')`;
        localStorage.setItem('fluxos-wallpaper', url); // Save preference
    }

    function applyTheme(color) {
        document.documentElement.style.setProperty('--accent-color', color);
        localStorage.setItem('fluxos-theme', color);
    }

    function loadInitialWallpaper() {
        const savedWallpaper = localStorage.getItem('fluxos-wallpaper');
        if (savedWallpaper) {
            setWallpaper(savedWallpaper);
        } else {
            // Set a default wallpaper if none is saved
            if (WALLPAPERS.length > 0) {
                setWallpaper(WALLPAPERS[0]);
            }
        }
    }

    function loadInitialTheme() {
        const savedTheme = localStorage.getItem('fluxos-theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            applyTheme(THEME_COLORS[0]); // Default theme
        }
    }

    // --- Boot & Login Sequence ---
    powerButton.addEventListener('click', () => {
        loadInitialTheme();
        hideElement(powerButton);
 
        showElement(bootScreen);
 
        setTimeout(() => {
            hideElement(bootScreen);
            showElement(welcomeScreen);
        }, 2000); // Show boot message for 2 seconds
 
        setTimeout(() => {
            hideElement(welcomeScreen);
            // Load saved or default wallpaper
            loadInitialWallpaper();
            // The wallpaper is now on the body, so the login screen appears over it.
            showElement(loginScreen, 'flex'); // Login screen uses flexbox
        }, 4000); // Show welcome for 2 seconds, then show login
    });
 
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        if (passwordInput.value === CORRECT_PASSWORD) {
            hideElement(loginScreen);
            // Add a class to the body to switch to the desktop view
            document.body.classList.add('loggedin');

            // Now, show the desktop and taskbar together after login.
            showElement(desktop, 'block');
            showElement(taskbar, 'flex');
            startClock();
        } else {
            alert('Incorrect Password!');
            passwordInput.value = '';
        }
    });

    // --- Clock Functionality ---
    function startClock() {
        updateClock(); // Update immediately
        setInterval(updateClock, 1000); // Then update every second
    }

    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        clockElement.textContent = timeString;
    }

    // --- Start Menu & Shutdown Functionality ---
    startButton.addEventListener('click', (e) => {
        // Stop the click from propagating to the desktop, which would close the menu
        e.stopPropagation();
        startMenu.classList.toggle('visible');
    });

    // Hide start menu if clicking anywhere on the desktop
    desktop.addEventListener('click', () => {
        if (startMenu.classList.contains('visible')) {
            startMenu.classList.remove('visible');
        }
        // Also hide the context menu
        if (contextMenu.style.display === 'block') {
            hideElement(contextMenu);
        }
        // Deselect all icons and taskbar apps when clicking on the desktop
        document.querySelectorAll('.desktop-icon.selected').forEach(icon => icon.classList.remove('selected'));
        document.querySelectorAll('.taskbar-app.active').forEach(btn => btn.classList.remove('active'));
    });

    // Open terminal from start menu
    startMenuTerminal.addEventListener('click', () => {
        openApp(terminalWindow);
        startMenu.classList.remove('visible'); // Hide menu after opening app
    });

    // Open browser from start menu
    startMenuBrowser.addEventListener('click', () => {
        openApp(browserWindow);
        startMenu.classList.remove('visible');
    });

    startMenuSettings.addEventListener('click', () => {
        openApp(settingsWindow);
        startMenu.classList.remove('visible');
    });

    startMenuDevspace.addEventListener('click', () => {
        openApp(devspaceWindow);
        startMenu.classList.remove('visible');
    });

    startMenuCalculator.addEventListener('click', () => {
        openApp(calculatorWindow);
        startMenu.classList.remove('visible');
    });

    // Shutdown button reloads the page to the initial state
    shutdownBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to shut down?')) {
            window.location.reload();
        }
    });

    // --- Start Menu Search ---
    startMenuSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const menuItems = startMenu.querySelectorAll('.start-menu-item');

        menuItems.forEach(item => {
            const itemName = item.textContent.toLowerCase();
            if (itemName.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
    // --- Wallpaper Selection ---
    function populateWallpaperSelection() {
        wallpaperSelectionContainer.innerHTML = ''; // Clear existing
        WALLPAPERS.forEach(wallpaperUrl => {
            const thumb = document.createElement('img');
            thumb.src = wallpaperUrl;
            thumb.classList.add('wallpaper-thumbnail');
            thumb.title = `Set as wallpaper`;
            thumb.addEventListener('click', () => {
                setWallpaper(wallpaperUrl);
            });
            wallpaperSelectionContainer.appendChild(thumb);
        });
    }
    populateWallpaperSelection(); // Run once on startup

    // --- Right-Click Context Menu ---
    desktop.addEventListener('contextmenu', (e) => {
        e.preventDefault(); // Prevent default browser menu
        
        // Position menu at cursor location
        contextMenu.style.top = `${e.clientY}px`;
        contextMenu.style.left = `${e.clientX}px`;
        showElement(contextMenu);
    });

    // Show specs window from context menu
    contextPropertiesBtn.addEventListener('click', () => {
        openApp(specsWindow);
        hideElement(contextMenu);
    });

    // Close specs window
    specsCloseBtn.addEventListener('click', () => {
        hideElement(specsWindow);
    });

    // Hide context menu when clicking anywhere else
    document.addEventListener('click', (e) => {
        if (e.target.offsetParent != contextMenu) {
            hideElement(contextMenu);
        }
    });

    // --- Settings App ---
    function populateThemeSwatches() {
        const currentTheme = localStorage.getItem('fluxos-theme') || THEME_COLORS[0];
        themeColorGrid.innerHTML = '';
        THEME_COLORS.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            if (color === currentTheme) {
                swatch.classList.add('active');
            }
            swatch.style.backgroundColor = color;
            swatch.addEventListener('click', () => {
                applyTheme(color);
                // Update active class on swatches
                document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
            });
            themeColorGrid.appendChild(swatch);
        });
    }
    populateThemeSwatches();

    // --- Calculator App Logic ---
    const calculator = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };

    function updateCalcDisplay() {
        const display = document.querySelector('.calc-display');
        display.textContent = calculator.displayValue;
    }
    updateCalcDisplay();

    function inputDigit(digit) {
        const { displayValue, waitingForSecondOperand } = calculator;
        if (waitingForSecondOperand === true) {
            calculator.displayValue = digit;
            calculator.waitingForSecondOperand = false;
        } else {
            calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
    }

    function inputDecimal(dot) {
        if (calculator.waitingForSecondOperand) return;
        if (!calculator.displayValue.includes(dot)) {
            calculator.displayValue += dot;
        }
    }

    function handleOperator(nextOperator) {
        const { firstOperand, displayValue, operator } = calculator;
        const inputValue = parseFloat(displayValue);

        if (operator && calculator.waitingForSecondOperand) {
            calculator.operator = nextOperator;
            return;
        }

        if (firstOperand == null && !isNaN(inputValue)) {
            calculator.firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation[operator](firstOperand, inputValue);
            calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
            calculator.firstOperand = result;
        }

        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
    }

    const performCalculation = {
        '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
        '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
        '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
        '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
        '=': (firstOperand, secondOperand) => secondOperand,
    };

    function resetCalculator() {
        calculator.displayValue = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
    }

    calculatorButtons.addEventListener('click', (event) => {
        const { target } = event;
        if (!target.matches('button')) return;

        if (target.classList.contains('operator')) {
            handleOperator(target.dataset.action === 'equals' ? '=' : target.textContent);
            updateCalcDisplay();
            return;
        }

        if (target.dataset.action === 'decimal') {
            inputDecimal('.');
            updateCalcDisplay();
            return;
        }

        if (target.dataset.action === 'clear') {
            resetCalculator();
            updateCalcDisplay();
            return;
        }

        if (target.classList.contains('number')) {
            inputDigit(target.textContent);
            updateCalcDisplay();
        }
    });
    // --- Window & App Management ---
    let draggedWindow = null;
    let offsetX, offsetY;

    function openApp(windowEl) {
        // If opening for the first time (or from a closed state), play animation
        if (windowEl.style.display === 'none') {
            windowEl.classList.add('opening');
            windowEl.addEventListener('animationend', () => {
                windowEl.classList.remove('opening');
            }, { once: true });
        }
        showElement(windowEl, 'flex');
        focusWindow(windowEl);
    
        // Create taskbar icon if it doesn't exist
        const windowId = windowEl.id;
        if (!document.getElementById(`taskbar-${windowId}`)) {
            createTaskbarIcon(windowEl);
        }
    }

    function closeApp(windowEl) {
        hideElement(windowEl);
        const windowId = windowEl.id;
        const taskbarIcon = document.getElementById(`taskbar-${windowId}`);
        if (taskbarIcon) {
            taskbarIcon.remove();
        }

        // Deselect desktop icon when app is closed
        const iconId = windowEl.id.replace('-window', '-icon');
        const desktopIcon = document.getElementById(iconId);
        if (desktopIcon) {
            desktopIcon.classList.remove('selected');
        }
    }

    function focusWindow(windowEl) {
        highestZIndex++;
        windowEl.style.zIndex = highestZIndex;

        // Update taskbar active state
        document.querySelectorAll('.taskbar-app').forEach(btn => btn.classList.remove('active'));
        const taskbarIcon = document.getElementById(`taskbar-${windowEl.id}`);
        if (taskbarIcon) {
            taskbarIcon.classList.add('active');
        }

        // Update desktop icon selected state
        document.querySelectorAll('.desktop-icon').forEach(icon => icon.classList.remove('selected'));
        const iconId = windowEl.id.replace('-window', '-icon');
        const desktopIcon = document.getElementById(iconId);
        if (desktopIcon) {
            desktopIcon.classList.add('selected');
        }
    }

    function createTaskbarIcon(windowEl) {
        const windowId = windowEl.id;
        const appName = windowEl.querySelector('.title').textContent;
    
        const button = document.createElement('button');
        button.id = `taskbar-${windowId}`;
        button.className = 'taskbar-app';
        button.textContent = appName;
        
        button.addEventListener('click', () => {
            if (windowEl.style.display === 'none') {
                showElement(windowEl, 'flex');
            }
            focusWindow(windowEl);
        });
    
        runningAppsContainer.appendChild(button);
    }

    function initializeWindow(windowEl) {
        const titleBar = windowEl.querySelector('.title-bar');
        const closeBtn = windowEl.querySelector('.close-btn');
        const minimizeBtn = windowEl.querySelector('.minimize-btn');
        const maximizeBtn = windowEl.querySelector('.maximize-btn');

        // Focus window on any click
        windowEl.addEventListener('mousedown', () => focusWindow(windowEl));

        // Setup dragging on title bar click
        titleBar.addEventListener('mousedown', (e) => {
            // Don't drag if clicking on a button
            if (e.target.tagName === 'BUTTON') return;
            draggedWindow = windowEl;
            offsetX = e.clientX - windowEl.offsetLeft;
            offsetY = e.clientY - windowEl.offsetTop;
            titleBar.style.cursor = 'grabbing';
        });

        closeBtn.addEventListener('click', () => closeApp(windowEl));

        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => hideElement(windowEl));
        }

        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', () => {
                windowEl.classList.toggle('maximized');
            });
        }
    }

    // Global listeners for dragging
    document.addEventListener('mousemove', (e) => {
        if (!draggedWindow) return;

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        draggedWindow.style.left = `${newX}px`;
        draggedWindow.style.top = `${newY}px`;
    });

    document.addEventListener('mouseup', () => {
        if (draggedWindow) {
            const titleBar = draggedWindow.querySelector('.title-bar');
            titleBar.style.cursor = 'move';
            draggedWindow = null;
        }
    });

    // Initialize all windows
    initializeWindow(terminalWindow);
    initializeWindow(thisPcWindow);
    initializeWindow(browserWindow);
    initializeWindow(specsWindow);
    initializeWindow(gamesWindow);
    initializeWindow(settingsWindow);
    initializeWindow(devspaceWindow);
    initializeWindow(calculatorWindow);

    // --- Terminal App Functionality ---
    terminalIcon.addEventListener('click', () => openApp(terminalWindow));

    // --- This PC App Functionality ---
    thisPcIcon.addEventListener('click', () => openApp(thisPcWindow));

    // --- Games App Functionality ---
    gamesIcon.addEventListener('click', () => openApp(gamesWindow));

    // --- Settings App Functionality ---
    settingsIcon.addEventListener('click', () => openApp(settingsWindow));

    // --- DevSpace App Functionality ---
    devspaceIcon.addEventListener('click', () => openApp(devspaceWindow));

    // --- Calculator App Functionality ---
    calculatorIcon.addEventListener('click', () => openApp(calculatorWindow));

    lockedFiles.forEach(file => {
        file.addEventListener('click', () => {
            alert('Access Denied: This file is critical to the system and cannot be opened.');
        });
    });

    // --- Browser App Functionality ---
    browserIcon.addEventListener('click', () => openApp(browserWindow));

    browserNavForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let url = browserAddressBar.value.trim();

        // If it's not a full URL, treat it as a search query for DuckDuckGo
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            if (url.includes('.') && !url.includes(' ')) { // Simple check for a domain
                url = 'https://' + url;
            } else {
                url = `https://duckduckgo.com/?q=${encodeURIComponent(url)}`;
            }
        }
        browserIframe.src = url;
    });

    // Handle terminal commands
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            const prompt = `\nC:\\Users\\Guest>${command}\n`;
            terminalOutput.textContent += prompt;

            executeCommand(command);

            terminalInput.value = '';
            // Scroll to the bottom of the output
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });

    function executeCommand(command) {
        let output = '';
        const parts = command.split(' ');
        const baseCommand = parts[0].toLowerCase();
        const args = parts.slice(1);

        switch (baseCommand) {
            case 'help':
                output = 'Available commands:\n' +
                         '  help          - Show this message\n' +
                         '  date          - Display the current date and time\n' +
                         '  clear         - Clear the terminal screen\n' +
                         '  about         - Information about Flux-OS\n' +
                         '  sysinfo       - Display system specifications\n' +
                         '  ls / dir      - List files in the current directory\n' +
                         '  echo [text]   - Print text to the console\n' +
                         '  theme [color] - Change the system accent color';
                break;
            case 'date':
                output = new Date().toString();
                break;
            case 'about':
                output = 'Flux-OS Version 1.1.0 "Modern"\n(c) 2024 Flux Corporation.';
                break;
            case 'clear':
                terminalOutput.textContent = ''; // Clear the screen
                break;
            case 'sysinfo':
                output = 'Flux-OS Specifications:\n' +
                         '  OS:   Flux-OS v1.1.0 "Modern"\n' +
                         '  CPU:  FluxCore i9 @ 3.0 GHz (Simulated)\n' +
                         '  RAM:  16.0 GB (Simulated)\n' +
                         '  GPU:  FluxGFX 9000 (Simulated)';
                break;
            case 'ls':
            case 'dir':
                output = 'C:\\Users\\Guest\n\n' +
                         '  📁 Program Files\n' +
                         '  📁 Users\n' +
                         '  📄 config.sys\n' +
                         '  🔒 kernel32.dll';
                break;
            case 'echo':
                output = args.join(' ');
                break;
            case 'theme':
                if (args.length === 0) {
                    output = 'Usage: theme <color>\nAvailable colors: ' + THEME_COLORS.map(c => c.replace('#', '')).join(', ');
                } else {
                    const foundColor = THEME_COLORS.find(c => c.toLowerCase().includes(args[0].toLowerCase()));
                    if (foundColor) {
                        applyTheme(foundColor);
                        populateThemeSwatches(); // Update settings app swatches
                        output = `Theme changed to ${foundColor}`;
                    } else {
                        output = `Color '${args[0]}' not found.`;
                    }
                }
                break;
            default:
                output = `'${baseCommand}' is not recognized as an internal or external command.`;
        }
        if (output) {
            terminalOutput.textContent += output + '\n';
        }
    }
});
