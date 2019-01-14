import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-servers',
  // selector: '[app-servers]'
  // selector: '.app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server created!';
  serverName = '';
  serverCreated = false;
  servers = ['TestServer1', 'TstServer2'];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server is created! Name is:' + this.serverName;
  }

  onUpdateServerName(event) {
    // console.log('onUpdateServerName');
    // console.log(event);
    this.serverName = event.target.value;
  }
}
