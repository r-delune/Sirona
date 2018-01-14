import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import { Upload } from './upload';
import * as _ from "lodash";

@Component({
  selector: 'upload-form',
  templateUrl: './upload-form.component.html',
  //styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent {
  selectedFiles: FileList;
  currentUpload: Upload;
   basePath;
   db;

  constructor(private upSvc: UploadService) { }
  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }
  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
   // this.upSvc.pushUpload(this.currentUpload)
  }
  uploadMulti() {
    let files = this.selectedFiles
    let filesIndex = _.range(files.length)
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
  //    this.upSvc.pushUpload(this.currentUpload)
      }
    )
  }

  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name)
    })
    .catch(error => console.log(error))
  }
  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }
  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name:string) {
    //let storageRef = firebase.storage().ref();
    //storageRef.child(`${this.basePath}/${name}`).delete()
  }
}