@echo off
echo ===================================================
echo   PIVOT & PULSE - SERVER STARTUP SCRIPT
echo ===================================================
echo.
echo Starting the Backend Server in a new window...
start "Backend Server" cmd /k "cd server && npm install && npm run dev"

echo Starting the Frontend Server in a new window...
start "Frontend Server" cmd /k "cd frontend && npm install --legacy-peer-deps && npm run dev"

echo.
echo Both servers are starting up! 
echo Please wait a moment for the installations to finish.
echo Once they are ready, open http://localhost:3000 in your browser.
echo.
pause
