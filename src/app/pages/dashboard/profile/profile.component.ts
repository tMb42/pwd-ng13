import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthUser } from '../../../models/auth-user.model';
import { UploadFilesService } from '../../../services/upload-files.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  authUser: AuthUser = null;
  selectedFile: File = null;
  imagePreview: null;
  isLoading = false;
  imageSending = false;

  avatar: string;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private uploadFilesService: UploadFilesService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.getAuthUser().pipe(first()).subscribe((response: any) => {
      this.isLoading = false;
      this.authUser = response.data;
    });

    this.authService.getAuthUserUpdateListener().subscribe( (res: any) => {
      this.imageSending = false;
      this.authUser = res.user;
    });

  }

  //to preview image after selection of image file
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    // console.log(this.selectedFile);
    if(event.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (event:any) => {
        this.imagePreview = event.target.result;
      }
    }
  }

  //upload and save images in database through service.js
  profilePictureUpload() {
    this.imageSending = true;
    const avatarFormData = new FormData();
    avatarFormData.append('image', this.selectedFile, this.selectedFile.name);
    this.authService.uploadUserProfileImage(avatarFormData).subscribe(event => {
      this.router.navigate(['../../dashboard'], { relativeTo: this.route });
      if (event.type === HttpEventType.UploadProgress){
        this.imageSending = false;
        console.log('Upload Progress: ', Math.round(event.loaded/event.total*100) + '%');
          Swal.fire({
          icon: 'success',
          title: 'Profile picture updated successfully',
          showConfirmButton: false,
          timer: 3000
        });

      }else if (event.type === HttpEventType.Response){
        Swal.fire({ icon: 'error',  title: event.errors.image[0], showConfirmButton: false, timer: 2000 });
        console.log(event);
      }
    },
    err => {
      this.imageSending = false;
      console.log(err);
      // this.alertService.error(err);
      Swal.fire({ icon: 'error',  title: err.errors.image[0], showConfirmButton: false, timer: 2000 });
    });

  }

  //---------------------------------------------------------------------------------------------------------
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;


  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }


  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadFilesService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.uploadFilesService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      );
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }






}
