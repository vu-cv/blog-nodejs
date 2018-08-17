$(document).ready(function() {
	var socket = io.connect('http://localhost');

	socket.on('server-category-slug', function (data) {
		 $("#slug").val(data)
	});

  	$("#name").keyup(function(event) {
	  	console.log($("#name").val());
	  	socket.emit('send-name-category', $("#name").val());
  	});
});
