# React Demo App

An ASP.NET Core 9.0 application with a React frontend.

## Opening in Visual Studio Code

This repository includes a VS Code workspace configuration file that sets up the development environment with recommended extensions, debugging configurations, and tasks.

### Quick Start

1. **Install Prerequisites:**
   - [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
   - [Node.js](https://nodejs.org/) (LTS version recommended)
   - [Visual Studio Code](https://code.visualstudio.com/)

2. **Open the Workspace:**
   ```bash
   code react-demo-app.code-workspace
   ```
   
   Alternatively, in VS Code:
   - Go to `File > Open Workspace from File...`
   - Select `react-demo-app.code-workspace`

3. **Install Recommended Extensions:**
   - When you first open the workspace, VS Code will prompt you to install recommended extensions
   - Click "Install All" to install the recommended extensions for optimal development experience

4. **Install Dependencies:**
   - Open the integrated terminal in VS Code (`` Ctrl+` `` or `` Cmd+` ``)
   - The .NET dependencies will be restored automatically when you build
   - For React dependencies, run:
     ```bash
     cd react-demo-app/ClientApp
     npm install
     ```

## Development

### Running the Application

#### Method 1: Using VS Code Debugger (Recommended)

1. Press `F5` or go to the Run and Debug view (`Ctrl+Shift+D` or `Cmd+Shift+D`)
2. Select one of the following configurations:
   - **"Full Stack: .NET + React"** - Runs both the .NET backend and React development server with debugging
   - **"Launch ASP.NET Core with React DevServer"** - Runs the full application
   - **"Launch ASP.NET Core (.NET 9.0)"** - Runs just the .NET backend
   - **"Debug React in Chrome"** - Debugs the React frontend in Chrome

#### Method 2: Using Terminal Commands

Run the .NET application:
```bash
cd react-demo-app
dotnet run
```

Or run with hot reload:
```bash
cd react-demo-app
dotnet watch run
```

Run the React dev server separately (if needed):
```bash
cd react-demo-app/ClientApp
npm start
```

### Building for Production

```bash
cd react-demo-app
dotnet publish -c Release
```

This will:
1. Build the .NET application
2. Install npm dependencies
3. Build the React application
4. Package everything for deployment

## Project Structure

```
react-demo-app/
├── react-demo-app/              # ASP.NET Core application
│   ├── ClientApp/               # React application
│   │   ├── public/              # Public assets
│   │   ├── src/                 # React source code
│   │   └── package.json         # npm dependencies
│   ├── Controllers/             # API controllers
│   ├── Pages/                   # Razor pages
│   ├── Program.cs               # Application entry point
│   └── react-demo-app.csproj    # .NET project file
└── react-demo-app.sln           # Visual Studio solution file
```

## Available VS Code Tasks

Access tasks via `Terminal > Run Task...` or `Ctrl+Shift+B` / `Cmd+Shift+B`:

### .NET Tasks
- **build** - Build the .NET project (default build task)
- **clean** - Clean build artifacts
- **restore** - Restore .NET dependencies
- **publish** - Publish the application
- **watch** - Run with hot reload

### React Tasks
- **npm: install** - Install npm dependencies
- **npm: start** - Start React development server
- **npm: build** - Build React for production
- **npm: test** - Run React tests
- **npm: lint** - Run ESLint on React code

## Debugging

### Debug .NET Code
- Set breakpoints in `.cs` files
- Use the "Launch ASP.NET Core" configuration
- Debug information will appear in the Debug Console

### Debug React Code
- Set breakpoints in `.js` or `.jsx` files
- Use the "Debug React in Chrome" configuration
- Or use browser DevTools (Chrome recommended)

### Full Stack Debugging
- Use the "Full Stack: .NET + React" compound configuration
- Allows debugging both backend and frontend simultaneously

## Recommended Extensions

The workspace recommends the following VS Code extensions:

### .NET Development
- **C#** (ms-dotnettools.csharp) - C# language support
- **C# Dev Kit** (ms-dotnettools.csdevkit) - Enhanced C# development

### React/JavaScript Development
- **ESLint** (dbaeumer.vscode-eslint) - JavaScript linting
- **Prettier** (esbenp.prettier-vscode) - Code formatting
- **ES7+ React/Redux/React-Native snippets** - React code snippets
- **Auto Rename Tag** - Automatically rename paired HTML/JSX tags
- **Path Intellisense** - File path autocomplete

### General Productivity
- **GitLens** - Enhanced Git capabilities
- **TypeScript** - TypeScript language support
- **IntelliCode** - AI-assisted development

### Testing
- **Jest** - Jest test runner integration

## Troubleshooting

### Port Already in Use
If you get a "port already in use" error:
- The default ports are:
  - .NET: `https://localhost:5001` and `http://localhost:5000`
  - React dev server: `https://localhost:44448`
- Kill processes using these ports or change them in the configuration

### npm Install Fails
- Ensure you have Node.js installed: `node --version`
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

### .NET Build Fails
- Ensure .NET 9.0 SDK is installed: `dotnet --version`
- Try `dotnet clean` followed by `dotnet build`

## Additional Resources

- [ASP.NET Core Documentation](https://docs.microsoft.com/en-us/aspnet/core/)
- [React Documentation](https://react.dev/)
- [Create React App Documentation](https://create-react-app.dev/)
