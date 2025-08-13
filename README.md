# 🚀 Flux-OS - A Web-Based Operating System Simulator

Welcome to Flux-OS, a feature-rich operating system experience built entirely with web technologies. This project simulates a modern desktop environment right in your browser, complete with a boot sequence, login screen, draggable windows, a functional taskbar, and a suite of applications.


<img width="1920" height="1080" alt="Screenshot_2025-07-20_19_18_55" src="https://github.com/user-attachments/assets/56ce9fdd-9801-4a02-b589-dba1d901ee08" />

<img width="1920" height="1080" alt="Screenshot_2025-07-20_19_20_53" src="https://github.com/user-attachments/assets/219ba3e8-7df4-4231-9755-227c7f0d059f" />

## ✨ Features

Flux-OS is packed with features that mimic a real operating system:

*   **🖥️ Full Desktop Environment:**
    *   **Boot & Login:** A realistic power-on, boot sequence, and password-protected login screen.
    *   **Window Management:** Open multiple apps in windows that can be dragged, minimized, maximized, and closed. The active window is always brought to the front.
    *   **Taskbar & Start Menu:** A familiar taskbar shows running applications and a system tray clock. The Start Menu provides quick access to all apps and includes a search filter.
    *   **Right-Click Context Menu:** Right-click on the desktop to open a context menu.
    *   **Desktop Icons:** Launch applications directly from the desktop.

*   **⚙️ Built-in Applications:**
    *   **Terminal:** A command-line interface with commands like `help`, `date`, `sysinfo`, `echo`, `clear`, and even `theme` to change system colors on the fly.
    *   **Flux Browser:** A basic web browser that can navigate to any URL or perform a web search.
    *   **Settings:** Customize the look and feel of Flux-OS by changing the accent color.
    *   **This PC:** A simple file explorer that lets you change the desktop wallpaper.
    *   **Calculator:** A fully functional calculator for your basic arithmetic needs.
    *   **DevSpace:** A simple text editor for code snippets.
    *   And more placeholder apps like Games and Recycle Bin.

*   **🎨 Personalization & Persistence:**
    *   **Theme Customization:** Choose from a selection of accent colors in the Settings app.
    *   **Wallpaper Selection:** Pick your favorite desktop background from the "This PC" app.
    *   **State Saving:** Your chosen theme and wallpaper are saved in your browser's `localStorage`, so your preferences are remembered the next time you boot up!

## 🛠️ Tech Stack

This project is a testament to the power of the web, built with:

*   **HTML5:** For the core structure and layout of the OS.
    *   Uses `<template>` for dynamically creating app windows.
*   **CSS3:** For all the styling, animations, and responsive design.
    *   Leverages CSS Variables (`--accent-color`) for dynamic and easy theming.
*   **Vanilla JavaScript (ES6+):** For all the logic, interactivity, window management, and application functionality. No frameworks needed!

## 🚀 How to Run Locally

Running Flux-OS on your local machine is simple.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Balagopalcnair/fluxos.git
    ```

2.  **Navigate to the directory:**
    ```bash
    cd fluxos
    ```

3.  **Open the `index.html` file:**
    Simply open the `index.html` file in your favorite web browser (like Chrome, Firefox, or Edge).

4. **When asked for password for login:** 
    simply type in `123`

    > **Pro Tip:** For the best experience, use a live server extension (like the "Live Server" extension in VS Code) to run the project. This helps avoid potential issues with file paths.

## 📂 Project Structure

```
fluxos/
├── 📄 index.html       # The main HTML file containing the OS structure.
├── 🎨 fluxos.css        # All the styles for the OS components and apps.
├── ⚙️ fluxos.js         # The core JavaScript logic for the entire OS.
├── 📝 README.md                 # A README.md file for easy reference.
├── 🖼️ wallpapers/       # Folder containing desktop wallpaper images.
└── 👤 userimage.png     # The avatar for the login screen.
```

## 💡 Future Ideas

This project has a lot of potential for expansion! Here are a few ideas:

-   **Resizable Windows:** Implement logic to resize windows from their corners or edges.
-   **File System:** Create a virtual file system in JavaScript to allow creating, renaming, and deleting files and folders.
-   **More Apps:** Build out more complex applications like a Notepad, Paint, or a more advanced game.
-   **Improved Terminal:** Add more commands and support for command history.

---

## 👥 Authors & Contributors

- **Main Developer:** [Balagopal C Nair](https://github.com/Balagopalcnair)
- **Collaborator:** [Aravind Lal](https://github.com/mfscpayload-690)
