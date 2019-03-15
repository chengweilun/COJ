import { Component, OnInit } from '@angular/core';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;

  sessionId: string;

  language = 'Java';

  languages = ['Java', 'C++', 'Python'];

  defaultMode = {
    'Java': 'ace/mode/java',
    'Python': 'ace/mode/python',
    'C++': 'ace/mode/c_cpp'
  };

  defaultContent = {
    'Java': `public class Example {
      public static void main(String[] args) {
        //Type your code here
      }
    }`,
    'C++': `#include<isotream>
    void main() {

    }`,
    'Python': `def function:
    #type your code here`
  };

  constructor() { }

  ngOnInit() {
    this.initEditor();
  }

  initEditor() {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.editor.getSession().setMode('ace/mode/java');
    this.editor.setValue(this.defaultContent['Java']);
    this.editor.$blockScrolling = Infinity;

    document.getElementsByTagName('textarea')[0].focus();
    this.editor.lastAppliedChange = null;
  }

}
