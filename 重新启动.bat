@echo off
chcp 65001 >nul
echo ========================================
echo 紧急修复：重新启动开发服务器
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] 停止所有Node进程...
taskkill /F /IM node.exe >nul 2>&1
echo 等待进程完全停止...
timeout /t 3 /nobreak >nul

echo [2/4] 清理Vite缓存...
if exist "node_modules\.vite" (
    rmdir /s /q "node_modules\.vite"
    echo Vite缓存已清理
)

echo [3/4] 清理dist目录...
if exist "dist" (
    rmdir /s /q "dist"
    echo dist目录已清理
)

echo [4/4] 启动开发服务器...
echo.
echo ========================================
echo 请等待看到以下信息：
echo   VITE vX.X.X  ready in XXX ms
echo   Local: http://localhost:3000/
echo.
echo 然后在浏览器中访问 http://localhost:3000
echo 并按 Ctrl+Shift+R 强制刷新
echo ========================================
echo.

npm run dev

