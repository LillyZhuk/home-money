import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private form: FormGroup;
  public message: Message;
  public loading: boolean = false;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.message = new Message('', 'danger');

    this.route.queryParams.subscribe((params: Params) => {
      if (params['nowCanLogin']) {
        this.showMessage({text: 'Теперь вы можете зайти в систему', type: 'success'});
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(message: Message) {
    this.message = message;
    setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;
    this.loading = true;
    this.usersService.getUserByEmail(formData.email)
      .subscribe((data: User) => {
          const dataUser =  data['0'];
          if (dataUser) {
            if (dataUser.password === formData.password) {
              this.message.text = '';
              localStorage.setItem('user', JSON.stringify(dataUser));
              this.authService.login();
              this.router.navigate(['/system', 'bill']);
            } else {
              this.showMessage({
                text: 'Пароль не правильный',
                type: 'danger'
              });
            }
          } else {
            this.showMessage({
              text: 'Такого пользователя не существует',
              type: 'danger'
            });
          }
        },
        error => {
        this.loading = false;
        });
  }

}
