import { Component} from '@angular/core';
import { Auth } from './auth.service';
import { AuthHttp } from 'angular2-jwt';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app works!';

  constructor( private auth:Auth, private authHttp:AuthHttp ){

  }

  showProfile(){
    console.log(this.auth.userProfile);
  }

  updateProfile(){
    var url='https://'+'moorthi.auth0.com'+'/api/v2/users/'+this.auth.userProfile.user_id; 
    var data={
      user_metadata:{
        location:'Chennai'
      }
    }
    this.authHttp.patch(url,data)
      .subscribe(res=>{
        console.log(res.json());
      });
  }
}
