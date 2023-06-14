import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listUser: User[] = []

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this._userService.getUser().subscribe(data => {
      this.listUser = data;
    })
  }

}
