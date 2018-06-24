import { Component, OnInit } from '@angular/core';
import {Ticket} from '../model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ticket: Ticket = {
    id: 1,
    name: 'Ticket to Hollywood',
    row: 3,
    section: 'ABC'
  };
  constructor() { }

  ngOnInit() {
  }

}
