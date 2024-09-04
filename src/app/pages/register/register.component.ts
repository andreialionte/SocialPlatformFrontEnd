import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/services/auth/auth.service';
import { UserForRegister } from '../../core/interfaces/user-for-register';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  photoBg: string = "../../../assets/TalkLogo.png";
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService) { }

  register(): void {
    console.log('Registering user');
    if (this.registerForm.invalid) {
      console.error('Form is invalid');
      return;
    }
    if (this.passwordMismatch()) {
      console.error('Passwords do not match');
      return;
    }

    const user: UserForRegister = {
      email: this.registerForm.value.email || '',
      username: this.registerForm.value.username || '',
      password: this.registerForm.value.password || '',
      confirmpassword: this.registerForm.value.confirmPassword || ''
    };

    console.log('User data:', user);

    this.authService.registerUser(user).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        // Navigate to login or another page
      },
      error: (err) => {
        console.error('Registration error:', err);
        // Show user-friendly error message
      }
    });
  }

  passwordMismatch(): boolean {
    return this.registerForm.value.password !== this.registerForm.value.confirmPassword;
  }

  get emailFormControl() {
    return this.registerForm.get('email');
  }

  get usernameFormControl() {
    return this.registerForm.get('username');
  }

  get passwordFormControl() {
    return this.registerForm.get('password');
  }

  get confirmPasswordFormControl() {
    return this.registerForm.get('confirmPassword');
  }
}
