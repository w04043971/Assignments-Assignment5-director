"use strict"
/*
    Author: Dragos Andreita
    Date: Dec/9/2019
    Description: Final Project
*/
window.onload = populateSelect();
var countries = [];

function populateSelect() {
	// CREATE AN XMLHttpRequest OBJECT, WITH GET METHOD.
	var xhr = new XMLHttpRequest(),
		method = 'GET',
		overrideMimeType = 'application/json',
		url = 'countries.json'; // ADD THE URL OF THE FILE.
	xhr.onreadystatechange = function () {
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			// PARSE JSON DATA.
			countries = JSON.parse(xhr.responseText);
			var select_country = document.getElementById('countries');
			for (var i = 0; i < countries.length; i++) {
				// BIND DATA TO <select> ELEMENT.
				select_country.innerHTML = select_country.innerHTML + '<option value="' + `${i}` + '">' + countries[i].Name + '</option>';
			}
		}
	};
	xhr.open(method, url, true);
	xhr.send();
}
// GET THE SELECTED VALUE FROM <select> ELEMENT AND SHOW IT.
function displayCountryData(select) {
	//calculate flag path and file name                        replace all spacees with underscore
	var flags = "flags/" + countries[select.value].Name.replace(/\ /g, "_") + ".png";
	// get page element to display flag
	var flag = document.getElementById('flag');
	//display flag
	flag.innerHTML = `<img src= ${flags} +>`;
	//: <b>' + ele.options[ele.selectedIndex].text + '</b> </br>' +
	// 'ID: <b>' + ele.value + '</b>';
	DisplayPopulationData();
	displayCountryAreea();
	displayCountryDensity();
	displayCountryName(select);
}
//display selected country name 
function displayCountryName(select)
{
	//get selected country name
	var cantryName= countries[select.value].Name;
	//get page element to display
	var displayName= document.getElementById('names');
	displayName.innerHTML= cantryName;
}

// calculate word population 
function CalculateTotalWorldPopulation() {
	var total_population = 0;
	for (var i = 0; i < countries.length; i++) {
		total_population += countries[i].Population;
	}
	return total_population;
}
//transform square milles in squere km
function CalculateAreaInKM(countryAreaInMiles) {
	return countryAreaInMiles * 2.58999;
}
//display country area
function displayCountryAreea() {
	//get select country
	var country = document.getElementById("countries")
	//read km or milles
	var km = document.getElementById('mesures');
	//display km or milles
	var area = document.getElementById('Area');
	//if selected km display km
	if (km.value == "Km") {
		area.value = CalculateAreaInKM(countries[country.value].Area).toFixed(1);
	// else display milles	
	} else {
		area.value = countries[country.value].Area.toFixed(1);
	}
}
//display the population and population procentage
function DisplayPopulationData() {
	//get selected country
	var country = document.getElementById("countries");
	//get input field to display population
	var population = document.getElementById('population');
	//display population
	population.value = countries[country.value].Population;
	//get input field to display population procentage 
	var Procentage = document.getElementById('Procentage');
	//calculate and display population procentage
	Procentage.value = `${((countries[country.value].Population / CalculateTotalWorldPopulation()) * 100).toFixed(3)} %`;
}
//launch wikipedia page for selected country
function launchWiki() {
	//read country
	var country = document.getElementById("countries");
	//generate url from country name
	var url = "https://en.wikipedia.org/wiki/" + countries[country.value].Name.replace(/\ /g, "_");
	//open new window
	window.open(url, "_blank");
}
//display country density
function displayCountryDensity() 
{ 

	//get selected country
	var country = document.getElementById("countries")
	//get element km by id
	var sizes = document.getElementById('KM2');
	//display km or milles
	var density = document.getElementById('density');
	//if km are chosen calcult and display population density
	if (sizes.checked ) 
	{
		density.value = (countries[country.value].Population/CalculateAreaInKM(countries[country.value].Area)).toFixed(1);
	//else calculate and display population density in milles
	} else {
		density.value = (countries[country.value].Population / countries[country.value].Area).toFixed(1);
	}
}
