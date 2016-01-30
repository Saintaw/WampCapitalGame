//index.js
var $countries = "";
var $capitals = "";
var $continents = "";
var CountryStack = [];
var CityStack = [];
var SelectedCountry = "";

/* copy arrays in localstorage if they don't exist */
if (typeof localStorage.getItem('continents') === 'undefined' || localStorage.getItem('continents') === null) 
	{


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

	 $.getJSON( "./json/continent.json", function( data ) {
		$continents  = data;
		var tmp = JSON.stringify($continents);
		localStorage.setItem('continents', tmp);		
	});



	}
else
	{
		console.log('Storage vars already exist');
	$countries = $.parseJSON(localStorage.countries);
	$capitals = $.parseJSON(localStorage.capitals);
	$continents = $.parseJSON(localStorage.continents);		
	}



LoadCountries();
LoadCapitals();





$( "#continents-but" ).click(function() {

	//console.log($continents);
	$.each( $continents, function( key, value ) {
	  //console.log( key + ": " + value );
	  var curr_country = key;
	  var curr_continent = value;

		$.each( $('.list-capitals'), function( key, value ) {
		  if ($(this).data('country') == curr_country)
		  $(this).append('<span class="badge">'+curr_continent +'</span>');
		});

		$.each( $('.list-countries'), function( key, value ) {
		  if ($(this).data('country') == curr_country)
		  $(this).append('<span class="badge">'+curr_continent +'</span>');
		});

	});



});


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
		//delete the li in both lists
		var tmp_country = 'ctry_' +Country;
		var tmp_capital = 'cap_' +Country;
		$('#' +tmp_country).delay(300).hide('slow');
		$('#' +tmp_capital).delay(300).hide('slow');

	}
	else {
		$tmp = "<li class='list-group-item red'>" + $capitals[SelectedCountry] + " -> " + $countries[Country]+ "</li>";
	}	
	$("#history ul").append($tmp);
}





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
$( "#countries ul" ).remove();
  var items = [];	
  $.each( $countries, function( key, val ) {
  	var l_key = key.toLowerCase();
    items.push( "<li class='list-group-item list-countries' id='ctry_" + key+ "' data-country='" + key + "'><img src='./media/flags/" + l_key + ".png' /> &nbsp;" + val + "</li>" );
  });
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

function DebugText(obj) {
	var obj_text = obj.colorName;
	var obj_col = obj.hexValue;
	$('#mydebug').append('<p style="color:'+ obj_col +';">' + obj_text + '</p>');
}

*/