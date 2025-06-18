import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: any[] = [];
  private loggedInUser: any = null;

  constructor() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.users = [
        {
          username: 'testuser',
          password: 'test123',
          name: 'Test User',
          phoneNumber: '1234567890',
          email: 'testuser@example.com',
          gender: 'Male',
          dob: '1990-01-01',
          profilePicture: 'assets/img/1Profile.jpg',
        },
      ];
      this.saveUsersToLocalStorage();
    }
  }

  private saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  addUser(user: any) {
    user.profilePicture = localStorage.getItem('profilePicture') || user.profilePicture; 
    this.users.push(user);
  }
  

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  login(username: string, password: string): boolean {
    const user = this.getUserByUsername(username);
    if (user && user.password === password) {
      this.loggedInUser = user;
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return !!this.loggedInUser;
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  updateUser(updatedUser: any): boolean {
    if (this.loggedInUser) {
      if (!updatedUser.phoneNumber || updatedUser.phoneNumber.length !== 10) {
        console.error('Mobile number should be exactly 10 digits.');
        return false;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(updatedUser.email)) {
        console.error('Invalid email format.');
        return false;
      }

      const index = this.users.findIndex(
        (user) => user.username === this.loggedInUser.username
      );
      if (index !== -1) {
        this.users[index] = { ...this.users[index], ...updatedUser };
        this.loggedInUser = this.users[index];
        this.saveUsersToLocalStorage();
        console.log('Updated User:', this.loggedInUser);
        return true;
      }
    }
    return false;
  }

  logout() {
    this.loggedInUser = null;
    console.log('User logged out');
  }
}
