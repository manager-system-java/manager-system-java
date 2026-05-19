import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmService, UserAdmin } from '../../services/adm.services';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adm.component.html',
  styleUrl: './adm.component.scss'
})
export class AdmComponent implements OnInit {
  users: UserAdmin[] = [];

  constructor(
    private admService: AdmService,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.admService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: () => this.toastr.error('Erro ao carregar usuários')
    });
  }

  updateRole(id: number, role: string) {
    this.admService.updateRole(id, role).subscribe({
      next: () => {
        this.toastr.success('Role atualizada com sucesso!');
        this.loadUsers();
      },
      error: () => this.toastr.error('Erro ao atualizar role')
    });
  }

  deleteUser(id: number) {
    this.admService.deleteUser(id).subscribe({
      next: () => {
        this.toastr.success('Usuário deletado com sucesso!');
        this.loadUsers();
      },
      error: () => this.toastr.error('Erro ao deletar usuário')
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}