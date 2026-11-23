
import * as vscode from 'vscode';



/**
 * Finds Python class and function definitions in the active document.
 * @param {vscode.TextDocument} document
 * @returns {{ classes: number[], defs: number[] }}
 */
function getDefinitions(document: vscode.TextDocument) {
    const classes = [];
    const defs = [];

    for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i).text;

        if (/^\s*class\s+\w+/.test(line)) {
            classes.push(i);
        } else if (/^\s*(async\s+)?def\s+\w+/.test(line)) {
            defs.push(i);
        }
    }

    return { classes, defs };
}



/**
 * Folds or unfolds the specified lines in the active editor.
 * @param {number[]} lines
 * @param {boolean} fold
 */
async function setFolding(lines: number[], fold: boolean) {
    if (lines.length === 0) { return; }

    await vscode.commands.executeCommand(
		fold ? 'editor.fold' : 'editor.unfold',
		{ selectionLines: lines }
    );
}



/**
 * Registers the extension commands.
 * @param {vscode.ExtensionContext} context
 */
function activate(context: vscode.ExtensionContext) {
    const commands = {
        'pyfold.foldClasses': async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) { return; }

            const { classes } = getDefinitions(editor.document);
            await setFolding(classes, true);
        },

        'pyfold.unfoldClasses': async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) { return; }

            const { classes } = getDefinitions(editor.document);
            await setFolding(classes, false);
        },

        'pyfold.foldDefs': async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) { return; }

            const { defs } = getDefinitions(editor.document);
            await setFolding(defs, true);
        },

        'pyfold.unfoldDefs': async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) { return; }

            const { defs } = getDefinitions(editor.document);
            await setFolding(defs, false);
        },

        'pyfold.foldAll': async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) { return; }

            const { classes } = getDefinitions(editor.document);
            const { defs } = getDefinitions(editor.document);

            await setFolding(defs, true);
            await setFolding(classes, true);
        },

        'pyfold.unfoldAll': async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) { return; }

            const { classes } = getDefinitions(editor.document);
            const { defs } = getDefinitions(editor.document);

            await setFolding(defs, false);
            await setFolding(classes, false);
        }
    };

    for (const [name, callback] of Object.entries(commands)) {
        context.subscriptions.push(
            vscode.commands.registerCommand(name, callback)
        );
    }
}

function deactivate() {}

module.exports = { activate, deactivate };
