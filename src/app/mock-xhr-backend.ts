import { Request, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class MockXHRBackend {
  constructor() {
 }

  createConnection(request: Request) {
    var response = new Observable((responseObserver: Observer<Response>) => {
      var responseOptions;
      switch (request.method) {
        case RequestMethod.Get:
          //if (request.url.indexOf('moodItems?medium=') >= 0 || request.url === 'moodItems') {
          //  var medium;
          //  if (request.url.indexOf('?') >= 0) {
          //    medium = request.url.split('=')[1];
          //    if (medium === 'undefined') medium = '';
          //  }
       //     var moodItems;
         //   if (medium) {
           //   moodItems = this._moodItems.filter(moodItem => moodItem.medium === medium);
        //    } else {
           //   moodItems = this._moodItems;
         //   }
       //     responseOptions = new ResponseOptions({
       //       body: { moodItems: JSON.parse(JSON.stringify(moodItems)) },
        //      status: 200
         //   });
       //   } else {
         //   var id = parseInt(request.url.split('/')[1]);
          //  moodItem = this._moodItems.filter(moodItem => moodItem.id === id);
        //    responseOptions = new ResponseOptions({
        //      body: JSON.parse(JSON.stringify(moodItems[0])),
         //     status: 200
         //   });
        //  }
          break;
        case RequestMethod.Post:
          var moodItem = JSON.parse(request.text().toString());
        //  moodItem.id = this._getNewId();
        //  this._moodItems.push(moodItem);
          responseOptions = new ResponseOptions({ status: 201 });
          break;
        case RequestMethod.Delete:
          var id = parseInt(request.url.split('/')[1]);
        //  this._deleteMoodItem(id);
          responseOptions = new ResponseOptions({ status: 200 });
      }

      var responseObject = new Response(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => { };
    });
    return { response };
  } 

  _deleteMoodItem(id) {
    var moodItem = this._moodItems.find(moodItem => moodItem.id === id);
    var index = this._moodItems.indexOf(moodItem);
    if (index >= 0) {
      this._moodItems.splice(index, 1);
    }
  }

  _getNewId() {
   // if (this._moodItems.length > 0) {
   //   return Math.max.apply(Math, this._moodItems.map(moodItem => moodItem.id)) + 1;
   // } else {
      return 1;
    }
  



  _moodItems = [{
    medium: 'Sleep',
    id:0,
    date: 40,
    generalMood: 40,
    appetite: 70,
    //sleep: new FormControl('50'),
    timeOfDay: 'Afternoon',
    sleepQuality: 80,
    sleepDifficulty: 80,
    sleepDreamIntensity: 20,
    sleepParalysis: 20,
    sleepNotes: 'Well rested',
    pleasureCapacity: 70,
    energyLevel: 60,
    motivation: 60,
    selfWorth: 40,
    concentration: 60,
    //extStressors: new FormControl(),
    dietaryNotes: 'nicotine',
    stressEvents: 'Nothing worth mentioning',
    percievedMoodInfluence: '65',
    additionalNotes: 'None'
},{
    medium: 'Stressors',
    id:0,
    date: 40,
    generalMood: 40,
    appetite: 70,
    //sleep: new FormControl('50'),
    timeOfDay: 'Afternoon',
    sleepQuality: 80,
    sleepDifficulty: 80,
    sleepDreamIntensity: 20,
    sleepParalysis: 20,
    sleepNotes: 'Well rested',
    pleasureCapacity: 70,
    energyLevel: 60,
    motivation: 60,
    selfWorth: 50,
    concentration: 40,
    //extStressors: new FormControl(),
    dietaryNotes: 'nicotine',
    stressEvents: 'Very minor misunderstanding',
    percievedMoodInfluence: '65',
    additionalNotes: 'None'
}]

  }

    

