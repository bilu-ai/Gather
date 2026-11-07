@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  start "Gather preview server" cmd /k py -m http.server 4173 --bind 127.0.0.1
) else (
  start "Gather preview server" cmd /k python -m http.server 4173 --bind 127.0.0.1
)
timeout /t 2 /nobreak >nul
start "" http://127.0.0.1:4173
endlocal
