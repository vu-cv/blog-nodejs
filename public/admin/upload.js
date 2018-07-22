$(document).ready(function() {
	$("#icon-close").click(() => {
		$("#form-upload").css('display', 'none');
	});
	$('#btnSelectFile').click(function(event) {
		$('#ip-upload').trigger('click');
	});
	function myFunction() {
	    if ($("#form-upload").css('display') === "none") {
	        $("#form-upload").css('display', 'block');
	    } else {
	        $("#form-upload").css('display', 'none');
	    }
	}

	$('#btnAddNewMedia').click(() => {
		myFunction();
	});

	var maxSize = 5; //5MB

	var socket = io.connect("http://localhost");
	var siofu = new SocketIOFileUpload(socket);
	siofu.listenOnInput(document.getElementById("ip-upload"));
	siofu.listenOnDrop(document.getElementById("form-upload"));
	socket.on('server-send-image-new-upload', imageUrl => {
			// console.log(imageUrl);
			$('#rowImageMedia').append('<div class="col-sm-2 pd-bt-20"><img src="'+imageUrl+'" class="img-responsive image-media"></div>');
			
	});
	siofu.maxFileSize = maxSize*1024*1024;
	siofu.addEventListener("error", function(data){
	    if (data.code === 1) {
	        var options = {
				  "closeButton": true,
				  "debug": false,
				  "positionClass": "toast-top-right",
				  "onclick": null,
				  "showDuration": "1000",
				  "hideDuration": "1000",
				  "timeOut": "5000",
				  "extendedTimeOut": "1000",
				  "showEasing": "swing",
				  "hideEasing": "linear",
				  "showMethod": "fadeIn",
				  "hideMethod": "fadeOut"
				}
				toastr.error('Maximum upload file size: '+maxSize+' MB.', 'Upload Fail', options);
	    }
	});
	siofu.addEventListener("complete", function(event){
		// console.log(event);
		var options = {
		  "closeButton": true,
		  "debug": false,
		  "positionClass": "toast-top-right",
		  "onclick": null,
		  "showDuration": "1000",
		  "hideDuration": "1000",
		  "timeOut": "5000",
		  "extendedTimeOut": "1000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		}
		toastr.success('Upload file succesfully!', 'Media Upload', options);
    });

    // document.getElementById("file_button").addEventListener("click", siofu.prompt, false);

});