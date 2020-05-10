var socket = io();

var params = new URLSearchParams(window.location.search);
var lblTicketNumber = $('small');	
var pendingTicketsList = $('#pendingTicketsList');

// PARAMS

if( ! params.has('desktop')){
	window.location = 'index.html';
	throw new Error('desktop is required')
}

var desktop = params.get('desktop')
$('#ticketNumber').text(desktop);


// EVENTS

$('button').on('click', function() {
	socket.emit('attendTicket', { desktop: desktop }, function( error, ticket ){

		if( error ) return;

		var labelValue = ( typeof ticket === 'object' )? ticket.number : ticket;

		lblTicketNumber.text( labelValue ); 

	});
})

socket.on('pendingTickets', function( tickets ) {
	renderPendingTickets( tickets.pendingTickets );
});

socket.emit('pendingTickets', function( tickets ){
	renderPendingTickets( tickets );
});


function renderPendingTickets( tickets ){

	pendingTicketsList.empty();

	if( !tickets.length ){
		pendingTicketsList.append('<li class="list-group-item">No hay tickets</li>');
		return;
	}
	
	tickets.forEach( ticket => {	
		pendingTicketsList.append('<li class="list-group-item">'+ticket.number+'</li>');
	});
}
