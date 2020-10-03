import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  //selector: '.app-servers',
  //template: '<h1>ServersComponent</h1><app-server></app-server><app-server></app-server>',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer:boolean = false;
  allowNewUser:boolean = false;
  serverCreationStatus = 'No server was created!';
  userCreationStatus = 'No user was created!';
  serverName:string = '';
  username:string = '';
  serverCreated:boolean = false;
  servers = ['Testserver', 'Testserver 2'];
  showSecret:boolean = false;
  log = [];

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);

    if(this.username === '') {
      this.allowNewUser = false;
    }
  }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName)
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName
  }

  onCreateUser() {
    this.userCreationStatus = 'User was created! Name is ' + this.username
  }

  onToggleDetails() {
    this.showSecret = !this.showSecret;
    this.log.push(this.log.length + 1)
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  

}
