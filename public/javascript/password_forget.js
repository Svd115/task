				var error;
				
				$("#form_reset").on("submit", function(e){
					var psw = this["psw"].value;
					var confirm_psw = this["confirm_psw"].value;

					if(/^\s*$/.test(psw) && /^\s*$/.test(confirm_psw)){
						error = true;
						infos("danger", "Password and confirmation password required !!", true);
					}
					else{
						if(psw.length < 8){
							error = true;
							infos("danger", "Invalid password : minimum 8 characters with 1 uppercase, 1 lowercase and 1 number !!", true);
						}
						else {
							if(psw !== confirm_psw){
								error = true;
								infos("danger", "Please confirm correctly your password !!", true)
							}
						}
					}
					
					if(error){
						e.preventDefault();
						error = false;
					}
				});