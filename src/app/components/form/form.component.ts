import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ApiService} from '../../services/api.service'
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Output() dataLoader = new EventEmitter();

  constructor(private api:ApiService) {
   }

  loginForm = new FormGroup({
    input: new FormControl('',[Validators.required,Validators.minLength(1)]),
  });

  loginUser(){
    // console.warn(this.loginForm.value)
  }

  get input(){
    return this.loginForm.get('input')
  }

  onclick() {
    // console.log()
    this.api.getData(this.loginForm.value.input).subscribe((response: {data: any, fromCache: boolean}) => {
        this.dataLoader.emit(response);
        if (response.fromCache) {
            console.log('Data retrieved from cache.');
        } else {
            console.log('Data retrieved from server.');
        }
    console.log("get back!!!",response.data)
    });
    
}

}
