let gMap
let gMarkers = []

let gDirectionsDisplay;
let gDirectionsService = new google.maps.DirectionsService()

let gMapDirection = function(obj) {
    gDirectionsDisplay = new google.maps.DirectionsRenderer({
        polylineOptions: {
            strokeColor: obj.lineColor ? obj.lineColor : null,
            strokeWeight: obj.lineWidth ? obj.lineWidth : 3
        }, suppressMarkers: obj.disableTwoEnd ? obj.disableTwoEnd : true
    })
    gMap = new google.maps.Map(document.querySelector(obj.root), {
        center: obj.center ? obj.center : obj.markers[0].position,
        zoom: obj.zoom,
        styles: obj.styles ? obj.styles : '',
        strokeColor: 'red'
    })
    gDirectionsDisplay.setMap(gMap)

    if(obj.markers) {
        obj.markers.map((m, index) => {
            let markerConfig = {
                position: m.position,
                map: gMap,
                title: m.title,
                icon: m.icon,
                animation: obj.markerAnim
            }

            setTimeout(() => {
                let marker = new google.maps.Marker(markerConfig)

                obj.infoWindow.content = m.content
                obj.infoWindow.marker = marker
    
                let infoWindow = new SnazzyInfoWindow(obj.infoWindow)
    
                gMarkers.push(marker)
            }, obj.markerIn * index * 1000);
        })
    }
}