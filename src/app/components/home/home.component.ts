import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService,
    public storageService: StorageService
  ) { }

  ngOnInit() {
    if (!this.storageService.isUserLogged()) {
      this.router.navigate(['/login'])
    }
  }

  sair() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
