const fs = require('fs');

class Ticket {
	constructor(number, desktop){
		this.number = number;
		this.desktop = desktop;
	}
}

class TicketControl {
	
	constructor(){
		
		this.lastTicket = 0;
		this.currentDate = new Date().getDate();
		this.pendingTickets = [];
		this.lastFourTickets = [];

		this.data = require('../data/data');

		if( this.data.currentDate === this.currentDate ){
			this.lastTicket = this.data.lastTicket;
			this.pendingTickets = this.data.tickets;
		} else {
			this.resetTickets();
		}

	}

	nextTicket(){
		this.lastTicket++;
		const ticket = new Ticket(this.lastTicket, null)
		this.pendingTickets.push( ticket );
		this.saveTickets();

		return this.lastTicket;
	}

	getLastTicket(){
		return this.lastTicket;
	}
	
	getFourLastTickets(){
		return this.lastFourTickets;
	}
	
	getPendingTickets(){
		return this.pendingTickets;
	}

	attendTicket( desktop ){
		
		if( !this.pendingTickets.length ){		
			return 'No hay tickets';
		}

		const ticket = new Ticket( this.pendingTickets.shift().number, desktop );

		this.lastFourTickets.unshift( ticket );

		if( this.lastFourTickets > 4 ){
			this.lastFourTickets.splice( -1, 1);
		}

		this.saveTickets();

		return ticket;
	}

	resetTickets(){
		this.pendingTickets = [];
		this.lastFourTickets = [];
		this.lastTicket = 0;
		this.saveTickets();
	}

	saveTickets(){
		
		const jsonData = {
			lastTicket: this.lastTicket,
			currentDate: this.currentDate,
			tickets: this.pendingTickets,
			lastFourTickets: this.lastFourTickets
		} 

		const jsonString = JSON.stringify( jsonData );

		fs.writeFileSync( './server/data/data.json', jsonString );
	}


}

module.exports = {
	TicketControl
}