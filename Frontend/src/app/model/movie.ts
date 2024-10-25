export class Movie {
    constructor(
        public image: string,
        public movieName: string,
        public theatreName: string,
        public totalTickets: Number,
        public availableTickets: Number,
        public price:Number,
        public status:string
    ) {}
}