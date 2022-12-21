import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PangolinInterface } from '../interfaces';
import { PangolinService } from '../services/pangolin.service';
import { civiliteTypes, roleTypes } from '../types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  civiliteTypesTab: civiliteTypes[] = ['Homme', 'Femme', 'NB'];
  roleTypesTab: roleTypes[] = ['Guerrier', 'Alchimiste' , 'Sorcier' , 'Espions', 'Enchanteur'];
  obsPangolin: Subscription = new Subscription;
  obsRegisterAddFriend: Subscription = new Subscription;
  obsUpdatePangolin: Subscription = new Subscription;
  obsOwnPangolin: Subscription = new Subscription;
  pangolin: PangolinInterface = {
    _id: '',
    email: 'test.mounir@gmail.com',
    password: 'Test123*',
    name: 'testmounir',
    role: 'Guerrier',
    civilite: 'Homme',
    ami: ''
  }
  @Input() id: string | null = null;
  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private router: Router, private _pangolinService: PangolinService) {}

  ngOnDestroy(): void{
    this.obsPangolin.unsubscribe();
    this.obsRegisterAddFriend.unsubscribe();
    this.obsUpdatePangolin.unsubscribe();
    this.obsOwnPangolin.unsubscribe();
  }

  register(){
    this.obsPangolin = this._pangolinService.newPangolin(this.pangolin).subscribe(data => {
      if(data && !data.error && data.message){
        console.log('SUCCESS: ', data.message)
        this.router.navigate(['/login'])
      } else {
        console.log('ERROR', data.message)
      }
    });
  }

  retour(){
    this.router.navigate(['/login'])
  }

  updatePangolin(){
    this.obsUpdatePangolin = this._pangolinService.updatePangolin(this.pangolin).subscribe(data => {
      if(data && !data.error && data.message){
        console.log('SUCCESS: ', data.message)
        this.obsOwnPangolin = this._pangolinService.getOwnPangolin().subscribe(response => {
          if(response && !response.error && response.message){
            console.log('SUCCESS: ', response.message)
            this.pangolin = response.pangolin;
            this.newItemEvent.emit(JSON.stringify(this.pangolin));
          }else {
            console.log('ERROR: ', response.message)
          }
        })
      } else {
        console.log('ERROR: ', data.message)
      }
    });
  }

  registerAndAddFriend(){
    this.obsRegisterAddFriend = this._pangolinService.newPangolin(this.pangolin).subscribe((data) => {
      if(data && !data.error && data.message){
        console.log('SUCCESS: ', data.message)
        this.pangolin._id = this.id;
        this.pangolin.ami = data.pangolin._id;
        this.updatePangolin()
        console.log( this.pangolin)
        //this.reloadCurrentRoute()
        //this.router.navigate(['/dashboard'])
      } else {
        console.log('ERROR', data.message)
      }
    });
  }

  checkAuth(){
    return this._pangolinService.checkAuth()
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }
}
