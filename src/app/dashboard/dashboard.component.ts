import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PangolinInterface } from '../interfaces';
import { PangolinService } from '../services/pangolin.service';
import { roleTypes } from '../types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  obsOwnPangolin: Subscription = new Subscription;
  obsAllPangolins: Subscription = new Subscription;
  obsUpdatePangolin: Subscription = new Subscription;
  obsRegisterAddFriend: Subscription = new Subscription;
  pangolin: PangolinInterface = {
    _id: '',
    email: '',
    password: '',
    name: '',
    role: 'Guerrier',
    civilite: 'Homme',
    lastLogin: new Date(),
    createdAt: new Date(),
    updateAt: new Date(),
    ami: null
  };
  pangolins: PangolinInterface[] = [];
  roleTypesTab: roleTypes[] = ['Guerrier', 'Alchimiste' , 'Sorcier' , 'Espions', 'Enchanteur'];

  constructor(private router: Router, private _pangolinService: PangolinService, private _httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.obsOwnPangolin = this._pangolinService.getOwnPangolin().subscribe(data => {
      if(data && !data.error && data.message){
        console.log('SUCCESS: ', data.message)
        this.pangolin = data.pangolin;
        this.obsAllPangolins = this._pangolinService.getAllPangolins().subscribe(response => {
          if(response && !response.error && response.message){
            console.log('SUCCESS: ', response.message)
            this.pangolins = response.pangolins.filter((e: PangolinInterface) => e._id !== this.pangolin._id);
          } else {
            console.log('ERROR', data.message)
          }
        });
      } else {
        console.log('ERROR', data.message)
      }
    });
  }

  ngOnDestroy(): void{
    this.obsOwnPangolin.unsubscribe();
    this.obsAllPangolins.unsubscribe();
    this.obsUpdatePangolin.unsubscribe();
    this.obsRegisterAddFriend.unsubscribe();
  }

  updatePangolin(){
    console.log(this.pangolin)
    this.obsUpdatePangolin = this._pangolinService.updatePangolin(this.pangolin).subscribe(data => {
      if(data && !data.error && data.message){
        console.log('SUCCESS: ', data.message)
        this.obsOwnPangolin = this._pangolinService.getOwnPangolin().subscribe(response => {
          if(response && !response.error && response.message){
            console.log('SUCCESS: ', data.message)
            this.pangolin = response.pangolin;
          }else {
            console.log('ERROR: ', data.message)
          }
        })
      } else {
        console.log('ERROR: ', data.message)
      }
    });
  }

  deleteAmi(){
    this.pangolin.ami = null;
    this.updatePangolin();
  }

  registerAndAddFriend(){
    this.obsRegisterAddFriend = this._pangolinService.newPangolin(this.pangolin).subscribe(data => {
      if(data && !data.error && data.message){
        console.log('SUCCESS: ', data.message)
        this.pangolin.ami = data.pangolin._id;
        this.updatePangolin()
        //this.router.navigate(['/login'])
      } else {
        console.log('ERROR', data.message)
      }
    });
  }
}
