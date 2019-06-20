import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registretion',
  templateUrl: './registretion.component.html',
  styleUrls: ['./registretion.component.scss']
})
export class RegistretionComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean = false;

  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      name: new FormControl(null, [Validators.required]),
      agree: new FormControl(false, [Validators.requiredTrue])
    });
  }

  OnSubmit() {
    const newUser = this.form.value;
    this.loading = true;
    this.userService.createNewUser(newUser)
      .subscribe(user => {
        this.router.navigate(['/login'], {
          queryParams: {nowCanLogin: true}
        });
        },
        error => {
        this.loading = false;
        });
  }

}
