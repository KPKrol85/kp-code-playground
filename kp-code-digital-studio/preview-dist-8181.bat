@echo off
setlocal

pushd "%~dp0"
set "PORT=8181"

echo.
echo KP_Code Digital Studio dist preview
echo Serving existing dist files from:
echo   %CD%\dist
echo.
echo URL:
echo   http://localhost:8181
echo.
echo This command does not run a build.
echo Press Ctrl+C to stop the preview server.
echo.

call npm run preview
set "PREVIEW_EXIT_CODE=%ERRORLEVEL%"

echo.
if not "%PREVIEW_EXIT_CODE%"=="0" echo Preview exited with code %PREVIEW_EXIT_CODE%.

popd
pause
exit /b %PREVIEW_EXIT_CODE%
