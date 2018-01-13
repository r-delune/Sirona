import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';


//get and set data from the data store
//in this case, display items
//can wrap up a formula here and use it wherever
//specific things that are none component specific



@Injectable()
export class MoodItemService {
  constructor(private http: Http) {}


///FROM MOCK

  get(medium) {
    let searchParams = new URLSearchParams();
    searchParams.append('medium', medium);
    return this.http.get('moodItems', { search: searchParams })
      .map(response => {
        return response.json().moodItems;
      });
  }
  
  add(moodItem) {
    return this.http.post('moodItems', moodItem)
      .map(response => {});
  }
  
  delete(moodItem) {
    return this.http.delete(`moodItems/${moodItem.id}`)
      .map(response => {});
  }

  ///FROM GOOGLE DRIVE

  results: string[];
  SCOPES = ['https://www.googleapis.com/auth/drive','profile'];
  CLIENT_ID = "495548272715-67r36m55qsd160temkqqn737aqcga8b7.apps.googleusercontent.com";
  API_KEY = 'AIzaSyCdDI83cJB1AnohyAGRfFNNW7ui4p_Sea0';
  FOLDER_NAME = "Dos";
  FOLDER_ID = "root";
  FOLDER_PERMISSION = true;
  FOLDER_LEVEL = 0;
  NO_OF_FILES = 1000;
  DRIVE_FILES = [];
  FILE_COUNTER = 0;
  FOLDER_ARRAY = [];
 
  ngOnInit(): void {
    // Make the HTTP request:
    this.http.get('/api/items').subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['results'];
      console.log('HTTTP GET')
      console.log(this.results)
    })

  }

}
