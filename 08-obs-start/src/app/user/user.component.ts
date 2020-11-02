import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => { // Params is the observable, stream of data that gives us new values
      this.id = +params.id;
    });
  }

  onActivate() {
    // this.userService.activatedEmitter.emit(true) // Через EventEmitter
    this.userService.activatedEmitter.next(true) // Через Subject - rxjs
  }
}
