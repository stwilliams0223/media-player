// Media Element Player

$('audio,video').mediaelementplayer({
	success: function(player, node) {
	  $('#' + node.id + '-mode').html('mode: ' + player.pluginType);
	},
	startLanguage: 'en',
	translationSelector: true
});


$('#video-filter').click(function(){

  // hide audio
  $('.mejs-audio').hide();
  // show video
  $('.mejs-video').show().addclass('pulse');
  
});

$('#audio-filter').click(function(){
  
  // hide video
  $('.mejs-video').hide();
  // show video
  $('.mejs-audio').show().addclass('pulse');
  
});


  $(function(){
        $('video,audio').mediaelementplayer({
            success: function (mediaElement, domObject) {
                   var audio_src = $("li.current").attr("data-url");
              mediaElement.setSrc(audio_src);
                mediaElement.addEventListener('ended', function (e) {
                    mejsPlayNext(e.target);
                }, false);
              
            },
            keyActions: []
        });

        $('.mejs-list li').click(function() {
            $(this).addClass('current').siblings().removeClass('current');
            var audio_src = $(this).attr("data-url");
            $('audio#mejs:first').each(function(){
                this.player.pause();
                this.player.setSrc(audio_src);
                this.player.play();
            });
        });

    });

    function mejsPlayNext(currentPlayer) {
        if ($('.mejs-list li.current').length > 0){ // get the .current song
            var current_item = $('.mejs-list li.current:first'); // :first is added if we have few .current classes
            var audio_src = $(current_item).next().text();
            $(current_item).next().addClass('current').siblings().removeClass('current');
            console.log('if '+audio_src);
        }else{ // if there is no .current class
            var current_item = $('.mejs-list li:first'); // get :first if we don't have .current class
            var audio_src = $(current_item).next().text();
            $(current_item).next().addClass('current').siblings().removeClass('current');
            console.log('elseif '+audio_src);
        }

        if( $(current_item).is(':last-child') ) { // if it is last - stop playing
            $(current_item).removeClass('current');
        }else{
            currentPlayer.setSrc(audio_src);
            currentPlayer.play();
        }
    }