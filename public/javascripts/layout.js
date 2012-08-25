$(function(){

         
  	$("#videos li a").live('click',function(){
  		var id = $(this).attr("id");
  		console.log(player);
	
	      player = document.getElementById("myytplayer");

  		player.loadVideoById(id);
  		
                       
                       
  	});
  
})

	function onYouTubePlayerReady(playerId) {
      player = document.getElementById("myytplayer");
    }
