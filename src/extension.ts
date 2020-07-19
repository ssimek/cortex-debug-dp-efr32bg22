import { Extension, extensions, ExtensionContext, window } from 'vscode';
import * as path from 'path';

interface CortexDebug {
	registerSVDFile(expression: RegExp | string, path: string): void;
}

export function activate(context: ExtensionContext) {
	const cortexDebug: Extension<CortexDebug> = <Extension<CortexDebug>>extensions.getExtension('marus25.cortex-debug');
	if (!cortexDebug) {
		window.showErrorMessage('Cortex-Debug Extension is not available for device support packages');
		return;
	}

	cortexDebug.activate().then((cdbg) => {
		cdbg.registerSVDFile(/^EFR32BG22.*/i, path.join(context.extensionPath, 'data', 'EFR32BG22.svd'));
	}, (error) => {
		console.log('Unable to activate cortexDebug');
	});
}

export function deactivate() {}
