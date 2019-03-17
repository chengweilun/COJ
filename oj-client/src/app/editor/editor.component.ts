import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  output = '';

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

  constructor(private route: ActivatedRoute, @Inject('collaboration') private collaboration, @Inject('data') private data) { }

  ngOnInit() {
    // sessionId equal to the problem number
    this.route.params.subscribe(params => {
      this.sessionId = params[`id`];
      console.log('print out: ' + params);
      this.initEditor();
    });
  }

  initEditor() {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.editor.getSession().setMode('ace/mode/java');
    this.editor.setValue(this.defaultContent['Java']);
    this.editor.$blockScrolling = Infinity;

    document.getElementsByTagName('textarea')[0].focus();
    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;

    // binding the editor and socket_io
    this.editor.on('change', (e) => {
      console.log('editor changes: ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange !== e) {
        this.collaboration.change(JSON.stringify(e));
      }
    });

    this.editor.getSession().getSelection().on('changeCursor', () => {
      const cursor = this.editor.getSession().getSelection().getCursor();
      console.log('cursor moves: ' + JSON.stringify(cursor));
      this.collaboration.cursorMove(JSON.stringify(cursor));
    });

    this.collaboration.restoreBuffer();
  }

  resetEditor(): void {
    this.editor.getSession().setMode(this.defaultMode[this.language]);
    this.editor.setValue(this.defaultContent[this.language]);
    this.output = '';
  }

  submit(): void {
    const userCode = this.editor.getValue();
    const data = {
      user_code: userCode,
      lang: this.language.toLowerCase()
    };
    this.data.buildAndRun(data).then(res => this.output = JSON.stringify(res));
  }

  // setLanguage(lang) {
  //   this.language = lang;
  // }
}
