//(function($) {
$(function() {

  //Automatically adjust textarea height
  autosize(document.querySelectorAll('textarea'));

  $("#textarea").keypress(function (e) {
    var keyed = $(this).val();
    var keycode = e.charCode || e.keyCode;
    if (keycode  == 13 && keyed == 0) { 
      return false;
    }
  });

  $('#add').attr("disabled", true);
  $('#add').css('background-color', '#9C4450');
  $('#add').css('color', '#fff');

  //$('#clear').attr("disabled", true);

  $('#textarea').bind("change keyup input", function() {
    var keyed = $(this).val();
    if ($(this).val() == 0 ) {
      $('#add').attr("disabled", true);
      $('#add').css('background-color', '#9C4450');
    } else {
      $('#add').attr("disabled", false);
      $('#add').css('background-color', '#2d2d2d');
    }
  });
  
  var initialized = false;
  $("#add").click(function() {
    var userList = escapeHtml($('#textarea').val());
    $('#textarea').val('');
    var newitem ='<p><span class="drag" title="Drag"><i class="ion-android-more-vertical"></i><i class="ion-android-more-vertical"></i></span><span class="checkbox"></span>'+'<span spellcheck="false" class="textInner">'+userList+'<input type="text" style="display:none;" class="editable"/>' +'</span>'+'<span class="edit" title="Edit" style="text-indent: -9999px;">&#x270E;</span>'+'<span class="delete" title="Delete"><i class="ion-close-round"></i><span/></p>';
    $('#list').append(newitem);

    // markdown is enabled
    function escapeHtml(unsafe) {
      return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
    }

    if ($('#list p').length > 0) {
      $('#clear').show();
    } else {
      $('#clear').hide();
    }

    $("#add").css('background-color', '#9C4450').attr("disabled", true);

    var list=$("#list").html();
    localStorage.setItem('list', list);
    //location.reload();
    
    $(".textInner").blur(function() {
      var list=$("#list").html();
      localStorage.setItem('list', list);
    });

    if (!initialized) {
      $("#list").dragsort({ 
        dragSelector: ".drag",
        dragEnd: function() {
         var list = $("#list").html();
         localStorage.setItem("list", list);
       } 
     });
      initialized = true;
    }
    
    disableEnter();
    badge();
    return false;
  });

$("#textarea").keyup(function(event){
var keyed = $(this).val();
if(event.keyCode == 13 && !$(this).val() == 0){
  $("#add").click();
}
});

if (localStorage.getItem('list')) {
initialized = true;
$('#list').html(localStorage.getItem('list'));
$("#clear").show();
}

var count = 0;
$(document).on('click', ".checkbox", function (e) {
var target = $( e.target );

if (count === 0) {
  $(this).addClass("check");
  target.parent("p").addClass("checked");
  count++;
} else {
  $(this).removeClass("check");
  target.parent("p").removeClass("checked");
  count = 0;
}
var list = $("#list").html();
localStorage.setItem("list", list);

return false;
});

$("#list").dragsort({
dragSelector: ".drag",
dragEnd: function() {
  var list = $("#list").html();
  localStorage.setItem("list", list);
}
});

$(".textInner").blur(function() {
var list=$("#list").html();
localStorage.setItem('list', list);
});

$(document).on('click', '.delete', function() {
var parent = $(this).parent();
parent.remove();

var list = $("#list").html();
localStorage.setItem("list", list);

if ($('#list p').length > 0) {
  $('#clear').show();
} else {
  $('#clear').hide();
}

badge();
return false;
});

$(document).on('click','.edit' , function(e) {
var target = $( e.target );
var value = target.parent('p').find('.textInner').attr('contenteditable');

if (value == 'false') {
  target.parent('p').find('.textInner').attr('contenteditable','true');
  target.parent('p').find('.textInner').css("background-color","#d7d7d7")
  target.css('background-image', 'url(' + 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfgBgwSGzCPS3cSAAAA/0lEQVQoz2P8z4AfsOCS2GvJ1PT/CVMtDgX7zBh3/+dmYPgryojNir1qjEcZRBgYGBgY7jFhSh+WZNwJlWZgmIBhxR5+pu0MChA240zHyWgmbGdn3sCgD2H/38mYw8DAeIb1Y/J/IbbZtq8ZGBqZbFcyhEDVXmK3sf7MwMD0YQLDdMbWP2f36zMw2E2CSf9//sfH+jMDAwMD455njJIMDAwMDF8YNjDEQHV/ZbBzOgdhMjGugArywKX/MUTCpBkYmJjK/i9C80iB02YEh/E/AwPj/p7/RXCRiU4FyKqZGBgY/jsW/y+H8jcdLkI1Dh7U+4P+5/w/87fR7SsOBbgAAHpLSUfQJv50AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA2LTEyVDE4OjI3OjQ4KzAyOjAw9UL4yQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNi0wNi0xMlQxODoyNzo0OCswMjowMIQfQHUAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC' + ')');
  //set cursor after the text
  setCursorToEnd($(this).prev().get(0));
  
  $(document).keyup(function(e) {
    if(e.which == 13) {
      target.parent('p').find('.textInner').attr('contenteditable','false');
      target.parent('p').find('.textInner').css("background-color","#fff");
      target.css('background-image', 'url(' + 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfgBgwSIAJ7LsmqAAAA70lEQVQoz33RMUtCYRTG8f85XYkwSBC3gqCvYARNN41rDg7R2NxQa0N9kAt9gRqbHMLQm7i7BTbeoSkJSgzJ7H0bdDDft57195xzhiMWN/fZpUPZmlxFLyBuobmmDTYZIRqGqVOYshZ5s3d2I7Ot3umCqYVDqWLHJ4HDeS2aGnGC1lmRwdyJGe+Fz5CcEtMnnZTVx6B1+qSmEn3MNvzm9rp54NVU9t9B/2cQS3vVNP9iUPg+ZodbP4OCHNDjPLn0MQTdDGV7xpfcJDmOFhl0sEvWdoEnLlyGgAjRR0a0iPW6NFx8XUCHZdsYd6qfePMDRCp6AnPMnpMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDYtMTJUMTg6MzI6MDIrMDI6MDDy3735AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTA2LTEyVDE4OjMyOjAyKzAyOjAwg4IFRQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=' + ')');
}

var list=$("#list").html();
localStorage.setItem('list', list);
disableEnter();
});

}
else {
target.parent('p').find('.textInner').attr('contenteditable','false');
target.parent('p').find('.textInner').css("background-color","#fff");
target.css('background-image', 'url(' + 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfgBgwSIAJ7LsmqAAAA70lEQVQoz33RMUtCYRTG8f85XYkwSBC3gqCvYARNN41rDg7R2NxQa0N9kAt9gRqbHMLQm7i7BTbeoSkJSgzJ7H0bdDDft57195xzhiMWN/fZpUPZmlxFLyBuobmmDTYZIRqGqVOYshZ5s3d2I7Ot3umCqYVDqWLHJ4HDeS2aGnGC1lmRwdyJGe+Fz5CcEtMnnZTVx6B1+qSmEn3MNvzm9rp54NVU9t9B/2cQS3vVNP9iUPg+ZodbP4OCHNDjPLn0MQTdDGV7xpfcJDmOFhl0sEvWdoEnLlyGgAjRR0a0iPW6NFx8XUCHZdsYd6qfePMDRCp6AnPMnpMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDYtMTJUMTg6MzI6MDIrMDI6MDDy3735AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTA2LTEyVDE4OjMyOjAyKzAyOjAwg4IFRQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=' + ')');
}

var list=$("#list").html();
localStorage.setItem('list', list);

return false;
});

$(".textInner").attr('contenteditable','false');
$(".edit").css('background-image', 'url(' + 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfgBgwSIAJ7LsmqAAAA70lEQVQoz33RMUtCYRTG8f85XYkwSBC3gqCvYARNN41rDg7R2NxQa0N9kAt9gRqbHMLQm7i7BTbeoSkJSgzJ7H0bdDDft57195xzhiMWN/fZpUPZmlxFLyBuobmmDTYZIRqGqVOYshZ5s3d2I7Ot3umCqYVDqWLHJ4HDeS2aGnGC1lmRwdyJGe+Fz5CcEtMnnZTVx6B1+qSmEn3MNvzm9rp54NVU9t9B/2cQS3vVNP9iUPg+ZodbP4OCHNDjPLn0MQTdDGV7xpfcJDmOFhl0sEvWdoEnLlyGgAjRR0a0iPW6NFx8XUCHZdsYd6qfePMDRCp6AnPMnpMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDYtMTJUMTg6MzI6MDIrMDI6MDDy3735AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTA2LTEyVDE4OjMyOjAyKzAyOjAwg4IFRQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=' + ')');

function disableEnter() { 
$(".textInner").on('keypress', function (e) {

  var keycode = e.charCode || e.keyCode;
  if (keycode  == 13) { 
    return false;
  }
  var list=$("#list").html();
  localStorage.setItem('list', list);
});
}
disableEnter();

function badge() {
chrome.browserAction.setBadgeText({text: '' + $("#list p").length + ''});
chrome.browserAction.setBadgeBackgroundColor({ color: "#2d2d2d" });
}
badge();



$('#clear').click(function() {
window.localStorage.clear();
window.location.reload();
return false;
});

if ($('#list p').length > 0) {
$('#clear').show();
} else {
$('#clear').hide();
}


//http://stackoverflow.com/a/13514861/4991434
//set cursor after the text
function setCursorToEnd(ele){
var range = document.createRange();
var sel = window.getSelection();
range.setStart(ele, 1);
range.collapse(true);
sel.removeAllRanges();
sel.addRange(range);
ele.focus();
}

});
//})(jQuery);