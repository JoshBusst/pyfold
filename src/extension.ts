
import * as vscode from 'vscode';



// ---------- DRIVER FUNCTIONS ----------

function getDefinitions() {
    const classes = [];
    const defs = [];
    
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        for (let i = 0; i < editor.document.lineCount; i++) {
            const line = editor.document.lineAt(i).text;

            if (/^\s*class\s+\w+/.test(line)) {
                classes.push(i);
            } else if (/^\s*(async\s+)?def\s+\w+/.test(line)) {
                defs.push(i);
            }
        }
    }

    return { classes, defs };
}

async function setFolding(lines: number[], fold: boolean) {
    if (lines.length === 0) { return; }

    await vscode.commands.executeCommand(
		fold ? 'editor.fold' : 'editor.unfold',
		{ selectionLines: lines }
    );
}



// ---------- EXT EXPORT FUNCTIONS ----------

export function deactivate() {}

export function activate(context: vscode.ExtensionContext) {
    const commands = {
        'pyfold.foldClasses': async () => {
            const { classes } = getDefinitions();
            await setFolding(classes, true);
        },

        'pyfold.unfoldClasses': async () => {
            const { classes } = getDefinitions();
            await setFolding(classes, false);
        },

        'pyfold.foldDefs': async () => {
            const { defs } = getDefinitions();
            await setFolding(defs, true);
        },

        'pyfold.unfoldDefs': async () => {
            const { defs } = getDefinitions();
            await setFolding(defs, false);
        },

        'pyfold.foldAll': async () => {
            const { classes, defs } = getDefinitions();

            await setFolding(defs, true);
            await setFolding(classes, true);
        },

        'pyfold.unfoldAll': async () => {
            const { classes, defs } = getDefinitions();

            await setFolding(defs , false);
            await setFolding(classes, false);
        }
    };

    for (const [name, callback] of Object.entries(commands)) {
        context.subscriptions.push(
            vscode.commands.registerCommand(name, callback)
        );
    }
}
