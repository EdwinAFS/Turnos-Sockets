var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblDesktop1 = $('#lblDesktop1');
var lblDesktop2 = $('#lblDesktop2');
var lblDesktop3 = $('#lblDesktop3');
var lblDesktop4 = $('#lblDesktop4');


var ticketDesktop = [
	{ lblTicket: lblTicket1, lblDesktop: lblDesktop1 },
	{ lblTicket: lblTicket2, lblDesktop: lblDesktop2 },
	{ lblTicket: lblTicket3, lblDesktop: lblDesktop3 },
	{ lblTicket: lblTicket4, lblDesktop: lblDesktop4 }
]

// EVENTS

socket.on('currentStatus', function( tickets ){
	updateHTML( tickets.fourLastTickets )
});

socket.on('fourLastTickets', function( tickets ){
	var audio = new Audio();
	audio.src = 'audio/new-ticket.mp3';
	audio.play();
	updateHTML( tickets.fourLastTickets )
});

function updateHTML( fourLastTickets ){

	ticketDesktop.forEach( (item, index) => {
		
		if( index >= fourLastTickets.length ) return;

		item.lblTicket.text( 'Ticket '+ fourLastTickets[index].number )
		item.lblDesktop.text( 'Escritorio '+ fourLastTickets[index].desktop );
	});

}
