@echo off
cd /d "%~dp0"
echo Iniciando Autocor Control Legal...
echo.
echo Se iniciara el guardado compartido del PC.
echo Luego se abrira la aplicacion en http://127.0.0.1:8787
echo.
start "Autocor datos PC" /min cmd /k node server.js
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:8787/"
echo.
echo Listo. No cierres la ventana "Autocor datos PC" mientras uses la plataforma.
echo Los datos se comparten entre navegadores del mismo PC mediante autocor-datos-pc.json.
pause
