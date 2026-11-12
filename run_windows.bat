@echo off
cd /d "%~dp0"
echo ==========================================
echo        GRIDOPTIMA - PROJECT LAUNCHER
echo ==========================================
where python >nul 2>nul
if errorlevel 1 (
  echo Python was not found. Install Python 3.10+ and enable Add Python to PATH.
  pause
  exit /b 1
)
where gcc >nul 2>nul
if errorlevel 1 (
  echo GCC was not found. Install MinGW-w64 and add its bin folder to PATH.
  pause
  exit /b 1
)
python -m pip install -r requirements.txt
if errorlevel 1 (
  echo Could not install Python requirements.
  pause
  exit /b 1
)
python backend\app.py
pause
