import {Component} from '@angular/core';
//import {NgbCollapse} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-app',
  template: `


  <navbar></navbar>
  
  <router-outlet></router-outlet>
  <my-footer></my-footer>
`,
styleUrls: ['./app.component.css'],

})

export class AppComponent {
  title = 'AWOA';
  }
