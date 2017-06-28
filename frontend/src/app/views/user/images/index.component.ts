import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

 const URL = '/api/'; //need to see if this can work with fake-backend
//const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: [
    './index.component.css'
  ]
})
export class IndexComponent {
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}
