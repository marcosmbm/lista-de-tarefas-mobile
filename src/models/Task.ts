export class Task {
    id?: number;
    completed: boolean;
    description: string;
    createdDate: Date;
    completedDate?: Date;

    constructor(completed: boolean, description: string, createdDate: Date, completedDate?: Date){
        this.completed = completed;
        this.description = description;
        this.createdDate = createdDate;
        this.completedDate = completedDate;
    }
}
