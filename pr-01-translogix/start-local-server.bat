@echo off
setlocal
cd /d "%~dp0"

if not exist dist\index.html (
  echo [ERROR] dist\index.html not found.
  echo Run "npm run build" first.
  pause
  exit /b 1
)

echo Starting production preview from dist/ on http://localhost:8181/
python -m http.server 8181 --directory dist

endlocal
