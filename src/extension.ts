import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    const disposables: vscode.Disposable[] = [];

    

    disposables.push(
        vscode.commands.registerCommand('debug-namespace.addBreakpoints', () => {
            const breakpoints: vscode.SourceBreakpoint[] = [
                new vscode.SourceBreakpoint(
                    new vscode.Location(vscode.window.activeTextEditor!.document.uri, new vscode.Range(0, 0, 0, 0))
                ),
                new vscode.SourceBreakpoint(
                    new vscode.Location(vscode.window.activeTextEditor!.document.uri, new vscode.Range(1, 0, 1, 0))
                ),
                new vscode.SourceBreakpoint(
                    new vscode.Location(vscode.window.activeTextEditor!.document.uri, new vscode.Range(2, 0, 2, 0))
                )
            ];
            vscode.debug.addBreakpoints(breakpoints);
        })
    );

    disposables.push(
        vscode.commands.registerCommand('debug-namespace.removeBreakpoints', () => {
            vscode.debug.removeBreakpoints(vscode.debug.breakpoints);
        })
    );

    disposables.push(
        vscode.commands.registerCommand('debug-namespace.source', () => {
            const path = vscode.window.activeTextEditor?.document.uri.path;
            const sourceUri = vscode.debug.asDebugSourceUri({name: 'vince', path });
            try {
                const uri = vscode.debug.asDebugSourceUri(sourceUri);
                console.log(uri);
                vscode.window.showInformationMessage(uri.path);
            } catch (e) {
                console.log(`e: ${e}`);
                vscode.window.showInformationMessage('Invalid DebugProtocol.Source.');
            }
        })
    );

    disposables.push(
        vscode.commands.registerCommand('debug-namespace.invalidSource', () => {
            const path = vscode.window.activeTextEditor?.document.uri.path;
            const sourceUri = vscode.debug.asDebugSourceUri({});
            try {
                const uri = vscode.debug.asDebugSourceUri(sourceUri);
                console.log(uri);
                vscode.window.showInformationMessage(uri.path);
            } catch (e) {
                console.log(`e: ${e}`);
                vscode.window.showInformationMessage('Invalid DebugProtocol.Source.');
            }
        })
    );


    context.subscriptions.push(...disposables);
}

// this method is called when your extension is deactivated
export function deactivate() {}
