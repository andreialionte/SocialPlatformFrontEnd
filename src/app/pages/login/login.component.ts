import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { UserForLogin } from '../../core/interfaces/UserForLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  error?: string;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.email === "" || this.password === "") {
      this.error = "All fields must be completed.";
      return;
    } else if (!this.email.includes("@")) {
      this.error = "Please enter a valid email.";
      return;
    }

    const userForLogin: UserForLogin = {
      email: this.email,
      password: this.password
    };

    this.authService.loginUser(userForLogin).subscribe({
      next: (response) => {
        this.authService.storeToken(response.token);
        this.router.navigateByUrl('/dashboard');
        console.log('Login successful:', response);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.error = "Login failed. Please try again.";
      }
    });
  }
}
