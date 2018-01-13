export class Mood {
    date: Date;
    generalMood: number;
    apettite: number;
    pleasureCapacity:number;
    energyLevel:number;
    motivation:number;
    sleepQuality : number;
    sleepDifficulty:number;
    sleepDreamIntensity : number;
    sleepParalysis : number;
    sleepNotes : string;
    selfWorth:number;
    concentration:number;
    dietaryNotes:string;
    stressEvents:string;
    percievedMoodInfluence:string
    additionalNotes:string;

    constructor(date: Date, generalMood: number,apettite: number,
        sleepQuality:number,
        sleepDifficulty:number,
        sleepDreamIntensity:number,
        sleepParalysis:number,
        sleepNotes: string,
        pleasureCapacity:number,
        energyLevel:number,
        motivation:number,
        selfWorth:number,
        concentration:number,
        extStressors:string,
        dietaryNotes:string,
        stressEvents:string,
        percievedMoodInfluence:string,
        additionalNotes:string){
            this.date = date;
            this.generalMood = generalMood;
            this.apettite = apettite;
            this.sleepQuality = sleepQuality;
            this.sleepDifficulty = sleepDifficulty;
            this.sleepDreamIntensity = sleepDreamIntensity;
            this.sleepParalysis = sleepParalysis;
            this.sleepNotes =  sleepNotes;
            this.pleasureCapacity = pleasureCapacity;
            this.energyLevel = energyLevel;
            this.motivation = motivation;
            this.selfWorth = selfWorth;
            this.concentration = concentration;
            this.dietaryNotes = dietaryNotes,
            this.stressEvents = stressEvents,
            this.percievedMoodInfluence = percievedMoodInfluence,
            this.additionalNotes = additionalNotes;
    }
}