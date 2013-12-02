MpaShop.genderType = 'women';
MpaShop.filterType ='women-all';


function linkLookUp(storeName){

	for(var i = 0; i < MpaShop.stores.length; i++){
		if(MpaShop.stores[i].name === storeName){
			console.log(storeName);
			for(var z = 0; z<MpaShop.stores[i].links.length; z++){
				console.log(MpaShop.filterType);
				if(MpaShop.stores[i].links[z].name === MpaShop.filterType)
						return  MpaShop.stores[i].links[z].link;
			}
		}
	}
	// if no link found return error

}

var storeClickFunc = function(event){
	  console.log(event.target.alt);
	  var link = linkLookUp(event.target.alt);
	  console.log(link);
      var f = document.createElement("form");
      f.setAttribute('method',"post");
      f.setAttribute('action',"/frame");
      var s = document.createElement("input"); //input element, Submit button
      s.setAttribute('type',"hidden");
      s.setAttribute('name',"store[link]");
      s.setAttribute('value',link);
      f.appendChild(s);
      document.body.appendChild(f);
      f.submit();
}

var filterClickFunc = function(event){
	console.log(event);
	var filterVal = MpaShop.genderType +"-"+event.target.innerHTML;
	filterVal = filterVal.toLowerCase();
	MpaShop.filterType =filterVal;
	function fadeOutCallback(){
		if(event.target.innerHTML.toLowerCase() === 'all'){
				$('.link-item').each(function(){
					if($(this).hasClass(MpaShop.genderType) || $(this).hasClass('both'))
						$(this).fadeIn('slow');
				});

		}else{
				$('.'+filterVal).each(function(){
					if($(this).hasClass(MpaShop.genderType) || $(this).hasClass('both'))
						$(this).fadeIn('slow');
				});

		}
	}
	$('.link-item:visible').fadeOut('fast',fadeOutCallback);

}
var filterClickFunc2 = function(event){
	console.log(event);
	var filterVal = MpaShop.genderType +"-"+event.innerHTML;
	filterVal = filterVal.toLowerCase();
	function fadeOutCallback(){
		if(event.innerHTML.toLowerCase() === 'all'){
				$('.link-item').each(function(){
					if($(this).hasClass(MpaShop.genderType) || $(this).hasClass('both')){
						$(this).fadeIn('fast');
					}
				});

		}else{
				$('.'+filterVal).each(function(){
					if($(this).hasClass(MpaShop.genderType) || $(this).hasClass('both'))
						$(this).fadeIn('fast');
				});

		}
	}
	$('.link-item:visible').fadeOut('fast',fadeOutCallback);

}


function registerEventHandlers(){
	console.log("registering");
	$('.filter').each(function(){
		this.addEventListener('click',filterClickFunc);
	});
	$(document).ready(function(){   
		console.log("dom is rdy"); 
    	filterClickFunc2(document.getElementById('all-filter'));
	});
}
registerEventHandlers();



function loadLinks(){
	console.log("Loading links...");
	console.log(MpaShop);
	// create elements with proper class names
	for(var storeIndex = 0; storeIndex < MpaShop.stores.length; storeIndex++){
			console.log("storeIndex is: "+ storeIndex);
			var newLi= document.createElement("li");
			var newClassName ='';
			for(var linkIndex=0; linkIndex< MpaShop.stores[storeIndex].links.length; linkIndex++){
				var linktype = MpaShop.stores[storeIndex].links[linkIndex].name;
				newClassName= newClassName+linktype+' ';
			}
			newLi.className= newClassName + MpaShop.stores[storeIndex].type +" link-item";
			var newA = document.createElement("a"); 
			newA.className ="links-link";
			var newImage = new Image();
			newImage.addEventListener('click',storeClickFunc);
			newImage.className = 'links-image';
			newImage.src=MpaShop.stores[storeIndex].image;
			newImage.alt=MpaShop.stores[storeIndex].name;
			newP = document.createElement('p');
			newP.className="links-text";
			newP.innerHTML=MpaShop.stores[storeIndex].name;

			// append elements to each other
			newA.appendChild(newImage);
			newA.appendChild(newP);
			newLi.appendChild(newA);
			if( newLi.className.indexOf(MpaShop.filterType) == -1 )
					console.log("hiding");
			document.getElementById('link-list').appendChild(newLi);
	}
	console.log("done loading links");

}
loadLinks();

//
// - CONTROL BACKGROUND COLOR and switch gender filter
//
function bgColorEvent (){
	document.getElementById("types-women").onclick=function(){
		$('body').removeClass();
		$("body").addClass("women-pink");
		MpaShop.genderType = 'women';
		MpaShop.filterType ='women-all';
		filterClickFunc2(document.getElementById('all-filter'));
	}
	document.getElementById("types-men").onclick=function(){
		$('body').removeClass();
		$("body").addClass("men-blue");
		MpaShop.genderType = 'men';
		MpaShop.filterType ='men-all';
		filterClickFunc2(document.getElementById('all-filter'));
	}
}
bgColorEvent();


