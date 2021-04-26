[![vsm-version](https://img.shields.io/visual-studio-marketplace/v/gdcrocx.lambda-inline-code-compiler?style=flat&label=VS%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=gdcrocx.lambda-inline-code-compiler)
[![Build Status](https://github.com/gdcrocx/lambda-inline-code-compiler/actions/workflows/github-actions-build.yml/badge.svg)](https://github.com/gdcrocx/lambda-inline-code-compiler)
[![Coverage Status](https://coveralls.io/repos/github/gdcrocx/lambda-inline-code-compiler/badge.svg?branch=master)](https://coveralls.io/github/gdcrocx/lambda-inline-code-compiler?branch=master)

# Lambda Inline Code Compiler

This is an extension to compile Python scripts into **Inline Code** required for **AWS::Lambda::Function** CloudFormation template. It compiles a `python3.8` boilerplate CloudFormation resource for AWS::Lambda::Function.

Simply run the extension by pressing `Ctrl+Shift+P` or `Cmd+Shift+P` and type `Convert to Inline Code for AWS::Lambda::Function`

## Features

The extension can quickly compile Inline code for Python files eliminating the need to manual convert files with escape characters or lint your code on an online website and risk exposing data on the Internet. 

The extension runs completely offline on your local window and the results are published in a new tab and stored as a JSON file.

> Tip: The Python file needs to be stored locally and cannot be read if the file is unsaved.

## Requirements

There are no specific requirements to run this extension. The backend code uses npm packages - path, fs to locate the file and write the output to a JSON file in the same folder.

## Extension Settings

N/A

## Known Issues

The extension is built on macOS and Windows compatibility is *untested*. Appreciate any help to this end.

## Release Notes

### 0.0.1

Initial release of the VSCode Extension

## Contributors

George Davis (GitHub Profile - [gdcrocx](https://github.com/gdcrocx)) - This is my first VSCode extension and hopefully one of many to come :nerd_face:

-----------------------------------------------------------------------------------------------------------
