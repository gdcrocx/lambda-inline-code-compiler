// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const fs = require('fs');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('lambda-inline-code-compiler.compileFile', async () => {
		const filePath = getOpenFilePath();
		logic(filePath, context);
	});
	context.subscriptions.push(disposable);
};

const getOpenFilePath = () => {
	if (!vscode.window.activeTextEditor){
		return "";
	};
	const path = vscode.window.activeTextEditor.document.uri.fsPath;
	return path;
};

const fileContentFromPath = async (path: string): Promise<string> => {
	const fs = require('fs').promises;
	const data = await fs.readFile(path, "utf8");
	return data;
};

const replaceNewlines = async (fileContents: string) => {
	return fileContents.replace(/[\r\n]+/gm, "\\n");
};

const detectWhitespaces = async (fileContents: string) => {
	let whitespaceCounter = 0;
	let firstIndex = fileContents.search("  ");
	for (var i=firstIndex; i <= fileContents.length; i++) {
		if (fileContents[i] == " ") {
			whitespaceCounter++;
		} else {
			break;
		};
	};
	console.log("Number of detected whitespaces in the first occurrence - " + whitespaceCounter.toString());
	return whitespaceCounter;
};

const replaceWhitespaces = async (fileContents: string, whitespaceCounter: number) => {	
	let simulateWhitespaces = "";
	for ( var j=0; j < whitespaceCounter; j++) {
		simulateWhitespaces = simulateWhitespaces + " ";
	};
	const regex = new RegExp(simulateWhitespaces, "g");

	if (simulateWhitespaces.length > 0) {
		fileContents = fileContents.replace(regex, "\\t");
	};
	return fileContents;
};

const replaceQuotes = async (fileContents: string) => {
	let regex = new RegExp("\'", "g");
	fileContents = fileContents.replace(regex, "\\'"); // Escape Single Quotes
	regex = new RegExp('\"', "g");
	fileContents = fileContents.replace(regex, '\\"'); // Escape any Double Quotes
	return fileContents;
};

const formatToInlineCode = async (fileContents: string) => {	
	fileContents = await replaceNewlines(fileContents);
	const detectedWhitespaces = await detectWhitespaces(fileContents);
	fileContents = await replaceWhitespaces(fileContents, detectedWhitespaces);
	fileContents = await replaceQuotes(fileContents);
	return fileContents;
};

const DeployFileContentsToMockJSONTemplate = async (fileContents: string) => {
	let JSONTemplate = {
		"Type": "AWS::Lambda::Function",
		"Properties": { 
			"Code": {				
				"ZipFile": ""
			},
			"Role": {
				"Ref": "AWS::NoValue"
			},
			"Runtime": "python3.8"
		}
	};
	JSONTemplate.Properties.Code.ZipFile = fileContents;
	return JSONTemplate;
};

const logic = async (filePath: string, context: vscode.ExtensionContext) => {
	try {
		if (filePath === null || filePath === "") {
			console.log(filePath);
			let message = "Something went wrong.";
			console.error(message);
			vscode.window.showInformationMessage(message);
		}
		// Found a Python script file to compile into AWS Lambda Inline Code
		else {
			// Display a message box to the user
			vscode.window.setStatusBarMessage("Scanning python script file...");			

			let fileContents = await fileContentFromPath(filePath);
			fileContents = await formatToInlineCode(fileContents);
			let result = await DeployFileContentsToMockJSONTemplate(fileContents);

			var fileName = filePath.replace(path.extname(filePath), ".json");

			fs.writeFileSync(fileName, JSON.stringify(result));
			let doc = await vscode.workspace.openTextDocument(fileName); // calls back into the provider
    		await vscode.window.showTextDocument(doc, { preview: false });

			vscode.window.setStatusBarMessage("Done Successful.", 3000);
			vscode.window.showInformationMessage("File compiled. Output in New Tab.");

			let outputChannel = vscode.window.createOutputChannel("output");
			outputChannel.appendLine("A new file is created with your Inline Code in this path - " + fileName);
			outputChannel.show(true);
		};
	} catch (error) {
		console.error(error);
		const message = "Something went wrong.";
		console.error(message);
		vscode.window.showInformationMessage(message);
	};
	
};

// this method is called when your extension is deactivated
export function deactivate() {};