@echo off
cd /d "%~dp0"
echo Iniciando Autocor Control Legal...
echo.
echo Se iniciara el guardado compartido del PC.
echo Luego se abrira la aplicacion local.
echo.
start "Autocor datos PC" /min cmd /k node server.js
timeout /t 2 /nobreak >nul
start "" "%~dp0index.html"
echo.
echo Listo. No cierres la ventana "Autocor datos PC" mientras uses la plataforma.
echo Los datos se comparten entre navegadores del mismo PC mediante autocor-datos-pc.json.
pause
