import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      const id = params['id'];
      const email = params['email'];
      console.log(id);
      console.log(email);
  });
  }

  ngOnInit() {
  }

}
