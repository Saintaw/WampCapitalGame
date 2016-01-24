//index.js
if (typeof localStorage.getItem('countries') === 'undefined' || localStorage.getItem('countries') === null) 
	{
    // variable is undefined or null
	var $countries = "";
	var $capitals = "";

	$.getJSON( "./json/names.json", function( data ) {
		$countries = data;
		var tmp = JSON.stringify($countries);
		localStorage.setItem('countries', tmp);	

	});
	 $.getJSON( "./json/capital.json", function( data ) {
		$capitals = data;
		var tmp = JSON.stringify($capitals);
		localStorage.setItem('capitals', tmp);		
	});

	}
else
	{
		console.log('Storage vars already exist');

	}
//console.log(localStorage.countries);
var CountryStack = [];
var CityStack = [];

LoadCountries();
LoadCapitals();

var SelectedCountry = "";



$( "#reset-but" ).click(function() {

	$('.list-capitals').removeClass( "sel" );
	$( ".list-countries").removeClass( "green" );
	$( ".list-countries").removeClass( "red" );
	$("#history ul").empty();

	LoadCountries();
	LoadCapitals();	

});



$( ".list-capitals" ).click(function() {
	var master = $(this).data('country');
	var master_text = $(this).text();

	var capitals_li = $('.list-capitals');
	capitals_li.removeClass( "sel" );
	$( ".list-countries").removeClass( "green" );
	$( ".list-countries").removeClass( "red" );	

	$(this).addClass('sel');
	SelectedCountry = master;
});


$( ".list-countries" ).click(function() {
	var master = $(this).data('country');
	var master_text = $(this).text();
	//console.log(SelectedCountry,master);

	if (SelectedCountry == master) {
		$(this).addClass('green');
	}
	else {
		$(this).addClass('red');
	}
	AddStory(master);
});





function AddStory(Country) {
	/* #list-history ul*/
	var $countries = $.parseJSON(localStorage.countries);
	var $capitals = $.parseJSON(localStorage.capitals);
	var stored_tmp = [];

	stored_tmp.country = Country;
	CityStack.push(stored_tmp);

	if (SelectedCountry == Country) {
		$tmp = "<li class='list-group-item green'>" + $capitals[SelectedCountry] + " -> " + $countries[Country]+ "</li>";
		//delete the lis in both lists
		var tmp_country = 'ctry_' +Country;
		var tmp_capital = 'cap_' +Country;
		$('#' +tmp_country).delay(300).hide();
		$('#' +tmp_capital).delay(300).hide();

	}
	else {
		$tmp = "<li class='list-group-item red'>" + $capitals[SelectedCountry] + " -> " + $countries[Country]+ "</li>";
	}	
	$("#history ul").append($tmp);
}




$( ".list-group-item" ).click(function() {
  //console.log($(this).attr('id'));
  /* classes:
	.bg-success
	.bg-danger
  */

});



/*
	if (typeof sessionStorage.getItem('clickcount') === 'undefined' || sessionStorage.getItem('clickcount') === null) 
		{
			sessionStorage.clickcount = 1;

		}
	else
		{
			sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;

		}
	//console.log('You clicked: ' + sessionStorage.clickcount + " times" );
*/





function LoadCapitals() {
var $capitals = $.parseJSON(localStorage.capitals);
$( "#capitals ul" ).remove();


  var items = [];	
  $.each( $capitals, function( key, val ) {
    if (val !== "")
    items.push( "<li class='list-group-item list-capitals' id='cap_" + key+ "' data-country='" + key + "'>" + val + "</li>" );
  });


	shuffle(items);

  $( "<ul />", {
    "class": "list-group",
    html: items.join( "" )
  }).appendTo( "#capitals" );
  
}



function LoadCountries() {
var $countries = $.parseJSON(localStorage.countries);



$( "#countries ul" ).remove();
  var items = [];	
  $.each( $countries, function( key, val ) {
    items.push( "<li class='list-group-item list-countries' id='ctry_" + key+ "' data-country='" + key + "'>" + val + "</li>" );
  });

  //shuffle(items);
  items.sort();

  $( "<ul />", {
    "class": "list-group",
    html: items.join( "" )
  }).appendTo( "#countries" );

}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
/*
RenderList($capitals,$countries);

function RenderList(capitals,countries) {
console.log(capitals)
}
*/



/*
//set an array locally
if (typeof localStorage.getItem('ColourData') === 'undefined' || localStorage.getItem('ColourData') === null) 
	{
    // variable is undefined or null
    InitColourStorage();

	}
else
	{
	var strColourSet = localStorage.getItem('ColourData');
	var arrColourset = JSON.parse(localStorage.getItem('ColourData'));
	console.log(arrColourset);



	$.each(arrColourset.colorsArray, function( index, value ) {
	  //loop elements (I need to add another loop within)
	  console.log('looop!');
	  var tmp = arrColourset.colorsArray[index];
	  console.log(tmp);

	  DebugText(tmp);


	});


	}


function InitColourStorage()
	{
    console.log('Does not exist, create it');
		 Colourset = {
		    "colorsArray":[{
		            "colorName":"red",
		            "hexValue":"#f00"
		        },
		        {
		            "colorName":"green",
		            "hexValue":"#0f0"
		        },
		        {
		            "colorName":"blue",
		            "hexValue":"#00f"
		        },
		        {
		            "colorName":"cyan",
		            "hexValue":"#0ff"
		        },
		        {
		            "colorName":"magenta",
		            "hexValue":"#f0f"
		        },
		        {
		            "colorName":"yellow",
		            "hexValue":"#ff0"
		        },
		        {
		            "colorName":"black",
		            "hexValue":"#000"
		        }
		    ]
		};	
	//save to local storage
	var tempColourset = JSON.stringify(Colourset);
	localStorage.setItem('ColourData', tempColourset);

	}

function DebugText(obj) {
	var obj_text = obj.colorName;
	var obj_col = obj.hexValue;
	$('#mydebug').append('<p style="color:'+ obj_col +';">' + obj_text + '</p>');
}

*/