import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  loginError = false;  
  passwordFieldType = 'password'; 

  constructor(private fb: FormBuilder, private navCtrl: NavController, private userService: UserService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    const { username, password } = this.loginForm.value;

    if (this.userService.login(username, password)) {
      console.log('Login successful');
      this.loginError = false;
      this.navCtrl.navigateForward('/home');
    } else {
      console.log('Invalid credentials');
      this.loginError = true;  
    }
  }

  goToSignup() {
    this.navCtrl.navigateForward('/signup');
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
