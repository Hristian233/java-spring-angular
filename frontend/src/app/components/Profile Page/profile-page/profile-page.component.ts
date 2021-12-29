import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less'],
})
export class ProfilePageComponent implements OnInit {
  userData: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    let userId = localStorage.getItem('userId');
    this.userService.getUserData(userId).subscribe(
      (res) => {
        this.userData = res.userData;
      },
      (err) => {}
    );
  }
}
