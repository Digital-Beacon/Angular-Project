import { Component } from '@angular/core';
import { CrudService } from './service/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularproject2';

candidate: any;
candidateFirstName: string;
candidateLastName: string;
candidateAge:number;
candidateContactNo: string;
candidateAddress: string;
candidateEmail: string;
candidateWorkExperience: number;
candidateSkills: string;
candidateResume: string;
message: string;

  constructor(private crudservice:CrudService){}

  ngOnInit()
  {
    this.crudservice.get_Allcandidate().subscribe(data => {
      
      this.candidate = data.map(e=>{
        return {
            id: e.payload.doc.id,
            isedit:false,
            firstName: e.payload.doc.data()['firstName'],
            lastName: e.payload.doc.data()['lastName'],
            age: e.payload.doc.data()['age'],
            contactNo: e.payload.doc.data()['contactNo'],
            address: e.payload.doc.data()['address'],
            email: e.payload.doc.data()['email'],
            workEperience: e.payload.doc.data()['workExperience'],
            skills: e.payload.doc.data()['skills'],
            resume: e.payload.doc.data()['resume'],
        };
      })
    });
  }

  async CreateRecord(file : any)
  {
    let Record = {};
    Record['firstName'] = this.candidateFirstName;
    Record['lastName'] = this.candidateLastName;
    Record['age'] = this.candidateAge;
    Record['contactNo'] = this.candidateContactNo;
    Record['address'] = this.candidateAddress;
    Record['email'] = this.candidateEmail;
    Record['workExperience'] = this.candidateWorkExperience;
    Record['skills'] = this.candidateSkills;
    let selectedFile = file.files[0];
    this.candidateResume = await this.crudservice.uploadFile(selectedFile).then((u)=>{ return u;});
    Record['resume'] = this.candidateResume;
    await this.crudservice.create_Newcandidate(Record).then(res => {

        this.candidateFirstName = "";
        this.candidateLastName = "";
        this.candidateAge = undefined;
        this.candidateContactNo = "";
        this.candidateAddress = "";
        this.candidateEmail = "";
        this.candidateWorkExperience = undefined;
        this.candidateSkills = "";
        this.candidateResume = "";
        console.log(res);
        this.message = "Application Submitted Successfully.";
    });
  }
  

  DeleteCandidate(record_id)
  {
    this.crudservice.delete_candidate(record_id);
  }
  DeleteUrl(candidateResume)
  {
    this.crudservice.delete(candidateResume);
  }
}
