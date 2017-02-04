$(document).ready(function() {
    var keystrokes;
    var userTweet;
    var retweets = 0;
    var favorites = 0;
    //$('.tweet-compose')[0].focus();

    $('.tweet-compose').on('click', function() {
        //double the box height
        $(this).css("height", "5em");
        //alternative
        // var inputBox = $(this);
        // var height = $(this).height() * 2;
        // inputBox.height(height);

        //make the button and character count reappear
        $('#tweet-controls').show();

    });

    $('.tweet-compose').keyup(function() {
        //keystrokes--;

        //console.log($(this).val().length);
        keystrokes = 140 - ($(this).val().length);
        //var remainingChars = maxChars - $(this).val().length;
        //console.log('remaining: ' + remainingChars);
        $('#char-count').text(keystrokes);
        if (keystrokes <= 10) {
            $('#char-count').css('color', 'red');
        } else {
            $('#char-count').css('color', '#999');
        }

        //show tweet button based on character count
        if (keystrokes < 0) {
            $('#tweet-submit').hide();
        } else {
            $('#tweet-submit').show();
        }

        userTweet = $(this).val();
    });

    //Add the tweet to feed
    $("button").click(function() {

        //clones the tweet class and adds user input into the class
        var cloneInfo = $(".tweet:first").clone();
        $("#stream").prepend(cloneInfo);

        //replaces the name element
        var name = $(".content p:first").text();
        cloneInfo.find($(".fullname:first").text(name));

        //changes the name and replaces the username
        name = name.replace(/\s/, "").toLowerCase();
        cloneInfo.find($(".username:first").text("@" + name));

        //Changes the tweet text
        cloneInfo.find($(".tweet-text:first").text(userTweet));

        //changes the avatar
        var imgSrc = $(".avatar:first").attr("src");
        cloneInfo.find($("#stream .avatar:first").attr("src", imgSrc));

        //changes the Retweet and Favorites count
        cloneInfo.find($(".num-retweets:first").text(retweets));
        cloneInfo.find($(".num-favorites:first").text(favorites));

        //removes the users-interact
        cloneInfo.find($(".users-interact").remove());

        //add the current time
        var time = new Date($.now());

        var month = [];
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        var timePeriod;
        if (time.getHours() < 12) {
            timePeriod = 'AM';
        } else {
            timePeriod = 'PM';
        }

        var formatted = time.getHours() + ":" + time.getMinutes() + " " + timePeriod + " - " + time.getDate() + " " + month[time.getMonth()] + " 17";
        cloneInfo.find($(".time:first").text(formatted));

        //resets the character count
        $(".tweet-compose").val("");
        $("#char-count").text("140");

        //decreases box size again
        $('.tweet-compose').css("height", "2.5em");
        $('#tweet-controls').hide();
    });

    $(".tweet-actions").hover();

});
