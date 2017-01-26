import { Injectable } from '@angular/core';
import { tokenNotExpired  } from 'angular2-jwt';


declare var Auth0Lock:any;


@Injectable()
export class Auth{
    userProfile;
    lock=new Auth0Lock('xglFOqqtkJkfIKKBenANeIRaw0m3QJtK','moorthi.auth0.com',{
        additionalSignUpFields:[
            {
                name:'Location',
                placeholder:'Where do you live?',
                validator: function(value){
                    return {
                        valid:value.length>=5,
                        hint:'Address should be minimum 5 characters'
                    };
                }
            }
        ]
    })

    constructor(){
        this.userProfile=JSON.parse(localStorage.getItem('profile'));
        this.lock.on('authenticated', authResult=>{
            localStorage.setItem('id_token',authResult.idToken);
            this.lock.getProfile(authResult.idToken,(error,profile)=>{
                if(error){
                    console.log("Error",error);
                    return;
                }
                localStorage.setItem('profile',JSON.stringify(profile));
                this.userProfile=profile;
         })

        });

    }

    public login(){
        this.lock.show();
    }

    public isAuthenticated(){
        return tokenNotExpired();
    }

    public logout(){
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.userProfile=null;
    }

}