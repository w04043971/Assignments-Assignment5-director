(function(){
    
       
    function fetchData(layer){
       console.log("Fetching Data...")
        fetch("https://opensky-network.org/api/states/all")
       .then(function(response){
           return response.json()
        })
       .then(function(json){
       
            var countryCanada=json.states.filter(function(element){
                return (element[2] === "Canada")  && (element[6] != null) && (element[5] != null);
            }).map(function(value){

                //create an array with geojson objects

                return {
                    type: "Feature", 
                    geometry: {
                        type: "Point", coordinates: [value[5], value[6]]
                    }, 
                    properties: {
                        callsign: value[1], 
                        icao24:value[0], 
                        true_track:value[10]
                    }
                };
            });
            
            if(layer != undefined){
                map.removeLayer(layer);
            }
            
            var newlayer = L.geoJson(countryCanada, {
                pointToLayer: plane, 
                onEachFeature: transmitter
               

                

            }).addTo(map);
             //console.log(json);

             console.log(countryCanada);

             setTimeout(() => fetchData(newlayer), 3000);
        });
       
    };
           

    //create map in leaflet and tie it to the div called 'theMap'
    var map = L.map('theMap').setView([44.648618, -63.585949], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    L.marker([44.648618, -63.585949]).addTo(map)
        .bindPopup('This is a sample popup. You can put any html structure in this including extra flight data. You can also swap this icon out for a custom icon. Some png files have been provided for you to use if you wish.')
        .openPopup();





        var PlaneIcon = L.Icon.extend({
            options: {
               iconSize:     [40, 50],
               shadowSize:   [60, 30],
               iconAnchor:   [22, 94],
               shadowAnchor: [4, 62],
               popupAnchor:  [-3, -76]
            }
        }); 

        function plane(feature, coordinate){
            return L.marker(coordinate, {
                        icon: new PlaneIcon({
                            iconUrl: 'plane2.png' 
                        }),
                        rotationAngle: feature.properties.true_track
            });
        };

        function transmitter(feature, layer){
           layer.bindPopup(`${feature.properties.callsign}-${feature.properties.icao24}`)
          // layer.bindPopup(feature.properties.callsign-feature.properties.icao24)
            // layer.bindPopup(layer.callsign-layer.icao24)
        };


    fetchData();
})()

//https://stackoverflow.com/questions/54234262/how-to-move-markers-on-openstreetmap-using-leaflet
//https://www.gps-coordinates.net/
//https://gis.stackexchange.com/questions/260852/switch-icons-on-geojson-file-in-leaflet
//https://stackoverflow.com/questions/41590102/change-leaflet-marker-icon
//https://github.com/bbecquet/Leaflet.RotatedMarker
//https://calgary.ca/General/Scripts/CitizenDashboard/CitizenDashboard/lib/leaflet/docs/examples/geojson/geojson.html
//https://gis.stackexchange.com/questions/229723/displaying-properties-of-geojson-in-popup-on-leaflet/229743
//https://gis.stackexchange.com/questions/232555/how-to-make-a-displayed-geojson-property-a-link-to-another-property-in-a-leaflet