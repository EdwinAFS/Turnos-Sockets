var socket = io();
var labelNewTicket = $('#lblNuevoTicket');

socket.on('currentStatus', function( ticket ){
	labelNewTicket.text( ticket.lastTicket )
});

$("#generateTicket").on('click', function( e ) {
	socket.emit("createTicket", function( ticket ){		
		labelNewTicket.text( ticket );
	});
})



