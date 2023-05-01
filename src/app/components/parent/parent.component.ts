import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  dataLoader:any;

  onDataLoader(data:any){
    console.log("get data!!!!")
    this.dataLoader=data;
  }

}
