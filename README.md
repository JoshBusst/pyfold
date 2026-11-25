# Python Code Folding

A lightweight Visual Studio Code extension for quickly folding and unfolding Python class and function definitions.

## Features

Provides six commands for controlling code folding:

| Command | Description |
|---|---|
| **Fold Classes** | Folds all Python class definitions. |
| **Unfold Classes** | Unfolds all Python class definitions. |
| **Fold Functions** | Folds all Python function definitions. |
| **Unfold Functions** | Unfolds all Python function definitions. |
| **Fold All** | Folds all function and class definitions. |
| **Unfold All** | Unfolds all function and class definitions. |

Supports both standard and asynchronous Python function definitions (`def` and `async def`).

## Usage

1. Open a Python file in VS Code.
2. Open the Command Palette (`Ctrl + Shift + P`).
3. Search for `pyFold`.
4. Select the desired folding command.

## Requirements

- Visual Studio Code
- Python language support
- Node.js and npm (for development)

## Development

Clone the repository and install dependencies:

```bash
npm install
```

Compile the TypeScript source:

```bash
npx tsc
```

Press `F5` in VS Code to launch the Extension Development Host and test the extension.

## Building an Installable Extension

The extension can be packaged into a `.vsix` file using Microsoft's Visual Studio Code Extension Manager (`vsce`).

### 1. Install vsce

```bash
npm install --global @vscode/vsce
```

### 2. Package the extension

From the project root directory, run:

```bash
vsce package
```

This generates an installable `.vsix` file in the project directory.

### 3. Install the extension

Install the generated package directly through the terminal, for instance:

```bash
code --install-extension pyfold-1.0.0.vsix
```

Alternatively, in VS Code:

1. Open the Extensions panel.
2. Select the three-dot menu (`...`).
3. Select **Install from VSIX...**.
4. Select the generated `.vsix` file.

The extension is now installed locally and available through the Command Palette.

## Implementation

The extension uses the VS Code API's built-in folding commands. Python class and function declarations are identified using simple regular expressions, with VS Code's Python language provider handling the actual folding regions.

## License

MIT