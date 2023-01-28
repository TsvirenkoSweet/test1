import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FileUploadService} from "../services/fileUpload.service";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent {
  form!: FormGroup;
  files!: File[];
  downloadLinks!: string[];

  constructor(private formBuilder: FormBuilder, private fileUploadService: FileUploadService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({});
  }

  onFileChange(event: any) {
    this.files = event.target?.files;
  }

  onFileDrop(event: any) {
    event.preventDefault();
    this.files = event.dataTransfer?.files;
  }

  onDragOver(event: { preventDefault: () => void; }) {
    event.preventDefault();
  }

  onSubmit() {
    this.fileUploadService.uploadFiles(this.files).subscribe(downloadLinks => {
      this.downloadLinks = downloadLinks;
    });
  }
}
