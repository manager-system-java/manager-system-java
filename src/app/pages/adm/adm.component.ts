import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmService, UserAdmin } from '../../services/adm.services';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-adm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adm.component.html',
  styleUrl: './adm.component.scss'
})
export class AdmComponent implements OnInit {
  users: UserAdmin[] = [];

  constructor(private admService: AdmService, private loginService: LoginService,
    private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.admService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error(err)
    });
  }

  updateRole(id: number, role: string) {
    this.admService.updateRole(id, role).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error(err)
    });
  }

  deleteUser(id: number) {
    this.admService.deleteUser(id).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error(err)
    });
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}