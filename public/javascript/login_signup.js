				var error;
				
				$("#signup_btn").on("click", function(){
					$("#form_login").css("display", "none");
					$("#form_signup").css("display", "");
					$("#signup_btn").css("display", "none");
					$("#login_btn").css("display", "");
				});
				
				$("#login_btn").on("click", function(){
					$("#form_login").css("display", "");
					$("#form_signup").css("display", "none");
					$("#signup_btn").css("display", "");
					$("#login_btn").css("display", "none");
					$("#form_forget").css("display", "none");
				});
				
				$("#forget_btn").on("click", function(){
					$("#form_login").css("display", "none");
					$("#form_forget").css("display", "");
					$("#signup_btn").css("display", "none");
					$("#login_btn").css("display", "");
				});
				
				$("#form_login").on("submit", function(e){
					var email = this["email"].value;
					var psw = this["psw"].value;

					if(/^\s*$/.test(psw) && /^\s*$/.test(email)){
						error = true;
						infos("danger", "Email and password required !!", true);
					}
					else{
						if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
							if(psw.length < 8){
								error = true;
								infos("danger", "Invalid password : minimum 8 characters with 1 uppercase, 1 lowercase and 1 number !!", true);
							}
						}
						else{
							error = true;
							infos("danger", "Invalid email adresse !!", true);
						}
					}
					
					if(error){
						e.preventDefault();
						error = false;
					}
				});
				
				$("#form_forget").on("submit", function(e){
					var email = this["email"].value;

					if(/^\s*$/.test(email)){
						error = true;
						infos("danger", "Email required !!", true);
					}
					else{
						if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
							error = true;
							infos("danger", "Invalid email adresse !!", true);
						}
					}
					
					if(error){
						e.preventDefault();
						error = false;
					}
				});
				
				$("#form_signup").on("submit", function(e){
					var email = this["email"].value;
					var psw = this["psw"].value;
					var confirm_psw = this["confirm_psw"].value;

					if(/^\s*$/.test(psw) && /^\s*$/.test(email) && /^\s*$/.test(confirm_psw)){
						error = true;
						infos("danger", "Email, password and confirmation password required !!", true);
					}
					else{
						if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
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
						else{
							error = true;
							infos("danger", "Invalid email adresse !!", true);
						}
					}
					
					if(error){
						e.preventDefault();
						error = false;
					}
				});
				
				
				
				
				
				