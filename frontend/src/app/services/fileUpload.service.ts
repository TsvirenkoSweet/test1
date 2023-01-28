import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) {}
  uploadFiles(files: File[]) {
    const formData = new FormData();
    for (const file of files) {
      formData.append('file', file, file.name);
    }
    return this.http.post('http://localhost:5005/file/upload', formData).pipe(
      map((response: any) => {
        return response.downloadLinks;
      })
    );
  }
}
