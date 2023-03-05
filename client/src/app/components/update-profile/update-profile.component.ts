import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchDataService } from '../../services/fetch-data.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  userName = '';
  userEmail = '';
  profilePicPath = '';
  imageFile?: File;

  constructor(
    private formBuilder: FormBuilder,
    private fetchData: FetchDataService,
    private router: Router
  ) {}

  userInfoForm = this.formBuilder.group({
    name: [this.userName],
    email: [''],
    picture: [''],
  });

  ngOnInit() {
    this.fetchData.updateUser(() => {
      const user = this.fetchData.getLoggedInUser();
      this.userInfoForm.controls.name.setValue(user.name || '');
      this.userInfoForm.controls.email.setValue(user.email);
      this.profilePicPath = user.picturePath;
    });
    // this.userProfilePic = user.picturePath.split('/').at(-1) || '';
  }

  onSubmit() {
    this.fetchData
      .updateUserInfo({ name: this.userInfoForm.value.name || '' })
      .subscribe(() => {
        if (this.imageFile)
          this.fetchData.uploadPicture(this.imageFile).subscribe();
        this.fetchData.updateUser(() => {
          this.router.navigate(['questions']);
        });
      });
  }

  onImageChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    console.log('here');
    let file: File | null;
    if (fileInput.files) {
      this.imageFile = fileInput.files[0];
    }
  }

  get pictureName() {
    return this.userInfoForm.controls.picture.value?.split('\\').at(-1);
  }
}
