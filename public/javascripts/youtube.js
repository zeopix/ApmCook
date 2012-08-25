$(function(){
	console.log("Init socket…");
	
	var socket = io.connect('http://localhost:3000');
	
  
  	socket.on('connect',function(data){
  		console.log('Connect');
  		console.log(data);
  	})
  
  	socket.on('videos',function(data){
  		console.log('Videos');

  		var jdata = $.parseJSON(data.data);
		
		var feed = jdata.feed;
		i=0;
		for(id in feed.entry){
			i++;
			var entry = feed.entry[id];
			console.log(entry);
			
			var id = entry.id.$t.split(":");
			var vid = id[id.length-1];
			entry.id = vid;
			video = ich.polaroid(entry);
			$("#videos").append(video);
			
		}

  	})
  	
  		var params = { allowScriptAccess: "always" };
    	var atts = { id: "myytplayer" };
    	swfobject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1&version=3",
                       "youtubeplayer", "640", "360", "8", null, null, params, atts);
                       

});

