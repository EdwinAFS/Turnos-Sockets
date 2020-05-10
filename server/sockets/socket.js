const io = require('../server');
const { TicketControl } = require('../models/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', function( client ) {

	client.emit('currentStatus', {
		lastTicket: ticketControl.getLastTicket(),
		fourLastTickets: ticketControl.getFourLastTickets()
	});
	
	client.on('createTicket', function( callback ) {
		const ticket = ticketControl.nextTicket();
		callback( ticket );
	});
	
	client.on('attendTicket', function( { desktop }, callback ) {

		if( ! desktop ){
			return callback({
				err: true,
				message: 'Desktop es required'
			}, null);
		}	

		const attendTicket = ticketControl.attendTicket( desktop );
		 
		callback( null, attendTicket );

		client.broadcast.emit("fourLastTickets", {
			fourLastTickets: ticketControl.getFourLastTickets()
		});

		io.emit("pendingTickets", {
			pendingTickets: ticketControl.getPendingTickets()
		});
		
	});

	client.on("pendingTickets", function( callback ){
		callback( ticketControl.getPendingTickets() );
	});

});

	