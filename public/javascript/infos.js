				function infos(level, message, permanent = false){
					var level = "alert-"+level;
					
					if(level === "alert-success"){
						var remove_class = "alert-danger";
						
					}
					else{
						var remove_class = "alert-success";
						var fade = function(){
							return null;
						};
					}
					
					var fade = function(){
						return $("#infos").fadeOut(5000, function(){
							$(this).css({"display": "block", "visibility": "hidden"});
						}) ;
					}
					
					$("#infos").removeClass(remove_class);
					
					if(!$("#infos").hasClass(level)){
						$("#infos").addClass(level);
					}
					$("#infos").stop(true, true);
					$("#infos").css("visibility", "visible");
					$("#infos p b").html(message);
					
					if(!permanent){
						fade();
					}
				}

				$("#close_infos").on("click", function(){
					$("#infos").css({"display": "block", "visibility": "hidden"});
				});