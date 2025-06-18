import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm!: FormGroup;
  maxDOB!: string;
  minDOB!: string;
  selectedDOB!: string;
  showCalendar: boolean = false;
  profilePicture: string = '';
  defaultProfilePicture: string = '../../assets/default-avatar.jpg';

  passwordVisible = false;
  confirmPasswordVisible = false;

  @ViewChild('dobPicker', { static: false }) dobPicker: any;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private userService: UserService
  ) {}

  ngOnInit() {
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const hundredYearsAgo = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

    this.maxDOB = eighteenYearsAgo.toISOString().split('T')[0];
    this.minDOB = hundredYearsAgo.toISOString().split('T')[0];

    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.matchPasswordsValidator('password')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      gender: ['', Validators.required],
      dob: ['', [Validators.required, this.validateDOB]],
    });
  }

  openDatePicker() {
    this.showCalendar = true; 
    this.dobPicker.open(); 
  }

  validateDOB(control: AbstractControl): ValidationErrors | null {
    const dob = new Date(control.value);
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    return dob > eighteenYearsAgo ? { invalidDOB: true } : null;
  }

  matchPasswordsValidator(passwordControlName: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = this.signupForm?.get(passwordControlName)?.value;
      const confirmPassword = control.value;
      return password === confirmPassword ? null : { mismatch: true };
    };
  }

  onDateChange(event: any) {
    const selectedDate = new Date(event.detail.value);
    this.selectedDOB = selectedDate.toLocaleDateString('en-US');
    this.signupForm.patchValue({ dob: selectedDate });
    this.showCalendar = false;
  }

  onProfilePictureChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePicture = e.target.result;
        localStorage.setItem('profilePicture', this.profilePicture); 
      };
      reader.readAsDataURL(file);
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  onSignup() {
    if (this.signupForm.valid) {
      const formValues = this.signupForm.value;
      const userData = {
        ...formValues,
        profilePicture: this.profilePicture || this.defaultProfilePicture,
      };

      this.userService.addUser(userData);
      console.log('Signup successful with values:', userData);

      this.navCtrl.navigateForward('/login');
    } else {
      this.signupForm.markAllAsTouched();
      console.log('Signup form is invalid');
    }
  }
}
