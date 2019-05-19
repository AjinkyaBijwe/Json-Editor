import { Component, OnInit, Renderer2 } from '@angular/core';
import * as JSONEditor from 'jsoneditor';
import { ConfirmResetComponent } from './confirm-reset/confirm-reset.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-json',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    dialog: MatDialog;
    renderer: Renderer2;
    options: any;
    jsonEditorCode: any;
    jsonEditorTree: any;
    darkMode: boolean;
    autoConvert: boolean;
    jsonCode: any;

    constructor(dialog: MatDialog, renderer: Renderer2) {
        this.dialog = dialog;
        this.renderer = renderer;
    }

    ngOnInit() {
        this.options = {
            code : {
                mode: 'code',
                onChange: () => {
                    const json = this.jsonEditorCode.get();
                    if (json) {
                        this.jsonCode = json;
                        this.setLocalStorage('jsonCode', JSON.stringify(json));
                        if (this.autoConvert) {
                            this.validateJSON('Tree');
                        }
                    }
                }
            },
            tree : {
                mode: 'tree',
                onChange: () => {
                    const json = this.jsonEditorTree.get();
                    if (json) {
                        this.jsonCode = json;
                        this.setLocalStorage('jsonCode', JSON.stringify(json));
                        this.validateJSON('Code');
                    }
                }
            }
        };
        this.jsonEditorCode = new JSONEditor(document.getElementById('jsonEditorCode'), this.options.code);
        this.jsonEditorTree = new JSONEditor(document.getElementById('jsonEditorTree'), this.options.tree);
        this.setDefaultOptions();
    }

    validateJSON = (type) => {
        if (type === 'Tree') {
            this.jsonEditorTree.set(this.jsonCode);
        } else if (type === 'Code') {
            this.jsonEditorCode.set(this.jsonCode);
        }
    }

    toggleTheme = (darkMode: boolean) => {
        this.setLocalStorage('darkModeJSON', darkMode);
        darkMode ? this.renderer.addClass(document.body, 'dark-theme') : this.renderer.removeClass(document.body, 'dark-theme');
    }

    setLocalStorage = (key, value) => {
        localStorage.setItem(key, value);
    }

    clearStorageOptions = () => {
        const className = this.darkMode ? 'confirmation-dark' : 'confirmation';
        const dialogRef = this.dialog.open(ConfirmResetComponent, {
            panelClass: className,
            restoreFocus: false
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                localStorage.removeItem('darkModeJSON');
                localStorage.removeItem('jsonCode');
                localStorage.removeItem('autoConvertJSON');
                this.setDefaultOptions();
            }
        });
    }

    setDefaultOptions = () => {
        this.darkMode = JSON.parse(localStorage.getItem('darkModeJSON'));
        this.autoConvert = JSON.parse(localStorage.getItem('autoConvertJSON'));
        this.jsonCode = localStorage.getItem('jsonCode') ? JSON.parse(localStorage.getItem('jsonCode')) : {
            Array: [1, 2, 3],
            Boolean: true,
            Null: null,
            Number: 123,
            Object: {
            a: 'b',
            c: 'd'
            },
            String: 'Hello World'
        };
        this.jsonEditorCode.set(this.jsonCode);
        if (this.autoConvert) {
            this.validateJSON('Tree');
        }
        if (this.darkMode) {
            this.renderer.addClass(document.body, 'dark-theme');
        }
    }
}
