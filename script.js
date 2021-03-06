$(function() {

    var canvas = document.getElementById('map-canvas');
  
    var latlng = new google.maps.LatLng(49.23119318976828, -123.11550692187923);
  
    var mapOptions = {
      zoom: 13,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      scrollwheel: true
    };
  
    var mapObj = new google.maps.Map(canvas, mapOptions);
    var marker = [];
    var infoWindow = [];


    //plot canada line
    const canadalineCoordinates = [
      { lat: 49.24906701196557, lng: -123.11526015979761 },
      { lat: 49.24523759573771, lng: -123.11549877618452 },
      { lat: 49.24454509171466, lng: -123.11590558934103 },
      { lat: 49.244040951557054, lng: -123.11669723326008 },
      { lat: 49.243034344432296, lng: -123.11799824655161 },
      { lat: 49.242640353685296, lng: -123.11820365406936 },
      { lat: 49.240825592860645, lng: -123.1182716491291 },
      { lat: 49.23903913465492, lng: -123.11654131282333 },
      { lat: 49.23875634351273, lng: -123.11620433385801 },
      { lat: 49.23818027809405, lng: -123.11592708765298 },
      { lat: 49.21021976341675, lng: -123.11696771872191 },
    ];
    const canadaline = new google.maps.Polyline({
      path: canadalineCoordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 4,
    });
  
    canadaline.setMap(mapObj);


    // マーカーデータ
    var markerData = [
      {
        position: new google.maps.LatLng(49.20954787349326, -123.11707077589682),
        title: 'Marine Drive',
        content: 'Marpole',
    
      },
      {
        position: new google.maps.LatLng(49.22638691937381, -123.11632486111897),
        title: 'Langara',
        content: 'Oakridge',

      },
      {
        position: new google.maps.LatLng(49.23346681088296, -123.1160406757537),
        title: 'Oakridge',
        content: 'Oakridge',

      },
      {
        position: new google.maps.LatLng(49.249122878436864, -123.11533610439632),
        title: 'King Edward',
        content: 'Riley Park',

      }
    ];

    
    // Info Window
    for (i = 0; i< markerData.length; i++) {
      marker[i] = new google.maps.Marker({
        position: markerData[i].position,
        map: mapObj,
        title: markerData[i].title,
        icon: markerData[i].icon,
      });
  
      infoWindow[i] = new google.maps.InfoWindow({ // add info window
        content: '<div class="name">' + markerData[i]['title'] + '</div>'
      });
      
      markerEvent(i);
    }
    
    function markerEvent(i) {
      marker[i].addListener('click', function() {
        infoWindow[i].open(mapObj, marker[i]);
      });
    }
    
    $('#input-form').submit(function() {
      setAddress($('#address').val());
      return false;
    });
  
    // Address search
    function setAddress(address) {
        var sad = address;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address':sad}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                mapObj.setCenter(results[0].geometry.location);
            } else {
                alert('Unable to locate address');
            }
        });
    }
  
  });
