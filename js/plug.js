;(function(){

	
	var y=(function(){
		

		function cap(item){
					
			return item.toUpperCase();
		}

		return{
			talk:function(){
				console.log(cap("Hello!"));
			
			}

		
		};

	})();
	y.talk();
})();
//d3.select('body').append('p').text('Hello word!');
