import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmService, UserAdmin } from '../../services/adm.services';

@Component({
  selector: 'app-adm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adm.component.html',
  styleUrl: './adm.component.scss'
})
export class AdmComponent implements OnInit {
  users: UserAdmin[] = [];

  constructor(private admService: AdmService) {}

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
}