import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private fireservice:AngularFirestore , private storage: AngularFireStorage) { }

  create_Newcandidate(Record)
  {
      return this.fireservice.collection('Candidate').add(Record);
  }

  get_Allcandidate()
  {
    return this.fireservice.collection('Candidate').snapshotChanges();
  }

  async uploadFile(file : any){
    let url;
    let fileId = file.name;
    let reference = this.storage.ref(fileId);
    let response = reference.put(file);
    response.percentageChanges().subscribe((percentage) => {
      console.log(`${percentage}% uploaded`);
    });
    await response.then((res)=>{
      url = res.ref.getDownloadURL();
      return url;
    });
    return url;
  }

  delete_candidate(record_id)
  {
    this.fireservice.doc('Candidate/' + record_id).delete();
  }
  delete(downloadUrl) {
    this.storage.storage.refFromURL(downloadUrl).delete();
  }
}
