import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userName!: string;
  userEmail!: string;
  userPhone!: string;
  dob!: Date;
  gender!: string;
  profileImage!: string;
  username!: string;
  isImageModalOpen = false;

  editName!: string;
  editEmail!: string;
  editPhone!: string;

  isEditing = false;
  errorMessage: string = '';

  constructor(private navCtrl: NavController, private userService: UserService) {}

  ngOnInit() {
    const loggedInUser = this.userService.getLoggedInUser();

    if (loggedInUser) {
      this.username = loggedInUser.username;
      this.userName = loggedInUser.name;
      this.userEmail = loggedInUser.email;
      this.userPhone = loggedInUser.phoneNumber;
      this.dob = new Date(loggedInUser.dob);
      this.gender = loggedInUser.gender;

      this.profileImage = loggedInUser.profilePicture || 'assets/img/1Profile.jpg';

      this.editName = this.userName;
      this.editEmail = this.userEmail;
      this.editPhone = this.userPhone;
    }
  }

  enlargeImage() {
    this.isImageModalOpen = true;
  }

  closeImageModal() {
    this.isImageModalOpen = false;
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }

  openFilePicker() {
    const filePicker = document.getElementById('filePicker') as HTMLInputElement;
    if (filePicker) {
      filePicker.click();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result; // Update profile image with the uploaded file
      };
      reader.readAsDataURL(file);
    }
  }
  

  saveChanges() {
    this.userName = this.editName;
    this.userEmail = this.editEmail;
    this.userPhone = this.editPhone;
    this.isEditing = false;
    this.errorMessage = '';
  }

  cancelChanges() {
    this.editName = this.userName;
    this.editEmail = this.userEmail;
    this.editPhone = this.userPhone;
    this.isEditing = false;
  }

  logout() {
    this.userService.logout();
    this.navCtrl.navigateRoot('/login');
  }

  goToHome() {
    this.navCtrl.navigateRoot('/tabs/home');
  }
}
