@echo off
echo Adding all changes...
git add .

echo Enter commit message:
set /p commit_msg=

if "%commit_msg%"=="" (
    echo No commit message provided. Aborting.
    pause
    exit /b 1
)

echo Committing with message: %commit_msg%
git commit -m "%commit_msg%"

echo Pushing to GitHub (master branch)...
git push origin master

echo Done! Changes should deploy automatically to Vercel.
pause