import { Component } from '@angular/core';
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
  pangolin: PangolinInterface = {
    _id: '',
    email: 'test.mounir@gmail.com',
    password: 'Test123*',
    name: 'testmounir',
    role: 'Guerrier',
    civilite: 'Homme',
  }
  constructor(private router: Router, private _pangolinService: PangolinService) {}

  ngOnDestroy(): void{
    this.obsPangolin.unsubscribe();
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
}
