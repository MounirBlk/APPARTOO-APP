import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginInterface } from '../interfaces';
import { PangolinService } from '../services/pangolin.service';
import { civiliteTypes, roleTypes } from '../types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  civiliteTypesTab: civiliteTypes[] = ['Homme', 'Femme', 'NB'];
  roleTypesTab: roleTypes[] = ['Guerrier', 'Alchimiste' , 'Sorcier' , 'Espions', 'Enchanteur'];
  obsPangolin: Subscription = new Subscription;
  auth: LoginInterface = {
    email: 'test.mounir@gmail.com',
    password: 'Test123*',
  }
  constructor(private router: Router, private _pangolinService: PangolinService) {}

  ngOnDestroy(): void{
    this.obsPangolin.unsubscribe();
  }

  login(){
    this.obsPangolin = this._pangolinService.login(this.auth).subscribe(data => {
      if(data && !data.error && data.message){
        console.log('SUCCESS: ', data.message)
        if(data.token){
          localStorage.setItem('token', data.token)
        }
        this.router.navigate(['/dashboard'])
      } else {
        console.log('ERROR: ', data.message)
      }
    });
  }

  inscription(){
    this.router.navigate(['/register'])
  }
}
