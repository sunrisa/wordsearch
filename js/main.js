$(document).ready(function() {
	$('form#size').submit(function(e) {
		e.preventDefault();

		var width = $('input[name=width]').val();
		var height = $('input[name=height]').val();

		if(width > 0 && height > 0) {
			$.post('/php/new.php', { width: width, height: height }, function(data) {
				window.location = '/p/' + data;
			});
		}
	});

	/*$('#wordsearchImage').Jcrop({
		onChange: showCoords
	});*/

	var coords = [];
	$('form#ocr').submit(function(e) {
		e.preventDefault();

		$('#uploadBtn').val('Uploading...');
		$('#uploadBtn').attr('disabled', 'disabled');

		var formData = new FormData($('form#ocr')[0]);

		$.ajax ({
			url: '/php/upload.php',
			type: 'POST',
			xhr: function() {
				var myXhr = $.ajaxSettings.xhr();

				if(myXhr.upload) {
					//myXhr.upload.addEventListener('progress', )
				}
				return myXhr;
			},
			success: uploaded,
			error: uploadError,
			data: formData,
			cache: false,
			contentType: false,
			processData: false
		});
	});

	var url;
	$('#cropImage').click(function() {
		console.log('here');
		$('#cropImage').html('Cropping...');
		$('#cropImage').attr('disabled', 'disabled');
		$.post('/php/crop.php', { image: url, coords: coords }, function(data) {
			window.location = "/p/" + data;
		});
	});

	function uploaded(data) {
		url = data;
		$('#uploadBtn').val('Uploaded');
		$('#uploadBtn').removeAttr('disabled');
		$('#wordsearchImage').attr('src', '/images/' + data);
		$('#wordsearchImage').load(function() {
			$('#wordsearchImage').Jcrop({
				onChange: showCoords,
				setSelect: [ 20, 20, $('#wordsearchImage').width() - 20, $('#wordsearchImage').height() - 20 ]
			});
		});

		$('#image').slideDown();
		$('#cropImage').select();
	}

	function uploadError() {
		$('#uploadBtn').val('Upload');
		$('#uploadBtn').removeAttr('disabled');
		alert("An error occurred.");
	}

	function showCoords(data) {
		var x = data.x;
		var y = data.y;
		var width = data.w;
		var height = data.h;

		coords = [x, y, width, height];
	}
});