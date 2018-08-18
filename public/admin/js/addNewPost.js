$(document).ready(function() {
	var socket = io.connect('http://localhost');

	socket.on('server-category-slug', function (data) {
		$("#permalink").text(window.location.hostname+"/"+data);
		$("#slug").val(data);
	});

	$("#title").keyup(function(event) {
		socket.emit('send-name-category', $("#title").val());
	});

	$(".custom-img").click(function(event) {
		$(".custom-img").removeClass('checked');
		$(this).addClass('checked');
		var id = $(this).attr("id");

		socket.emit('get-image-by-id', id);
	});

	socket.on('send-image-info', data => {
		console.log(data.path);
		var d = new Date(data.upload_time);
		// console.log(d.toLocaleString());
		$("#img-detail").attr('src', data.path);
		$("#filename").text(data.name);
		$("#uploaded").text(d.toLocaleString());
		$("#filesize").text((data.size/1024).toFixed(1) + " KB");
		$("#delete-attachment").html('<a id="del-media" href="/admin/media/'+data._id+'/delete">Delete Permanently</a>');
		$("#image-url").val(window.location.hostname+data.path);
		$("#image_url").val(data.path);
		$("#submitSet").click(function(event) {
			$("#image-isset").attr('src', data.path);
		});
	})
});
