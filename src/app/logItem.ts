export class Log {
    id: number;
    date: Date;
    timeOfDay : string;
    generalMood: number;
    appetite: number;
    motivation :number;
    concentration:number;
    energyLevel:number;
    sleepQuality : number;
    sleepDifficulty:number;
    sleepNotes : string;
    supplements:string;
    stressEvents:string;
    coffee:boolean;
    excerciseNotes:string;
    dietaryNotes: string;
    additionalNotes:string;

    constructor(id: number, date: Date, timeOfDay: string, generalMood: number, appetite: number,
        sleepQuality:number,
        sleepDifficulty:number,
        sleepNotes: string,
        energyLevel:number,
        motivation:number,
        concentration:number,
        supplements:string,
        dietaryNotes:string,
        stressEvents:string,
        coffee:boolean,
        excerciseNotes:string,
        additionalNotes:string){
            this.id = id;
            this.date = date;
            this.timeOfDay = timeOfDay;
            this.generalMood = generalMood;
            this.appetite = appetite;
            this.sleepQuality = sleepQuality;
            this.sleepDifficulty = sleepDifficulty;
            this.sleepNotes =  sleepNotes;
            this.energyLevel = energyLevel;
            this.motivation = motivation;
            this.coffee = coffee;
            this.concentration = concentration;
            this.supplements = supplements;
            this.excerciseNotes = excerciseNotes;
            this.dietaryNotes = dietaryNotes,
            this.stressEvents = stressEvents,
            this.additionalNotes = additionalNotes;
    }
}