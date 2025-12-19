# How to Open This Project in VS Code

This guide will help you quickly get started with this project in Visual Studio Code.

## Quick Start (2 minutes)

### Step 1: Open the Workspace File

Choose one of these methods:

**Method A: From Command Line**
```bash
code react-demo-app.code-workspace
```

**Method B: From VS Code**
1. Open VS Code
2. Go to `File` > `Open Workspace from File...`
3. Navigate to the repository folder
4. Select `react-demo-app.code-workspace`

**Method C: Double-click (Windows/Mac)**
- Double-click the `react-demo-app.code-workspace` file
- If prompted, choose to open with VS Code

### Step 2: Install Recommended Extensions

When the workspace opens, VS Code will show a notification:
```
This workspace has extension recommendations
```

Click **"Install All"** to install these essential extensions:
- C# & C# Dev Kit (for .NET development)
- ESLint & Prettier (for JavaScript/React)
- React snippets & debugging tools
- Git enhancements

⏱️ This may take 2-3 minutes depending on your internet connection.

### Step 3: Install Dependencies

Open the integrated terminal (`` Ctrl+` `` or `` Cmd+` ``) and run:

```bash
cd react-demo-app/ClientApp
npm install
```

⏱️ This may take 1-2 minutes.

### Step 4: Start Developing!

Press `F5` to launch the application with debugging, or:

1. Click the Run icon in the sidebar (or press `Ctrl+Shift+D` / `Cmd+Shift+D`)
2. Select **"Full Stack: .NET + React"** from the dropdown
3. Press the green play button (or press `F5`)

Your browser will automatically open to the running application!

## What You Get

✅ **Pre-configured debugging** - Debug both .NET and React code simultaneously  
✅ **Code formatting** - Automatic formatting on save with Prettier  
✅ **Linting** - ESLint catches errors as you type  
✅ **IntelliSense** - Smart code completion for C# and JavaScript  
✅ **Build tasks** - Quick access to build, test, and run commands  
✅ **Git integration** - Enhanced Git features with GitLens  

## Common Issues

### "Extension not found"
- Make sure you have an internet connection
- Try installing extensions manually from the Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)

### ".NET SDK not found"
- Install [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- Restart VS Code after installation

### "npm command not found"
- Install [Node.js](https://nodejs.org/) (LTS version recommended)
- Restart your terminal or VS Code after installation

### Port already in use
- The application uses ports 5000/5001 (ASP.NET) and 44448 (React)
- Close any applications using these ports or modify the port settings

## Next Steps

📖 Read the full [README.md](README.md) for detailed information about:
- Project structure
- Available commands
- Debugging tips
- Deployment instructions

🎯 Start coding! The workspace is now set up for optimal development.

## Support

If you encounter any issues:
1. Check the [README.md](README.md) troubleshooting section
2. Ensure all prerequisites are installed
3. Try closing and reopening the workspace
4. Restart VS Code

Happy coding! 🚀
