import React, {useEffect, useRef} from "react"

import L from 'leaflet'
import { Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

function WeatherMap({lat, lon, selectNewPlace, needCityName}) {

	const refMap = useRef(null);
	const currentZoom = useRef(6);

	const clickMap = e => {
		currentZoom.current = refMap.current.leafletElement.getZoom()
		if(e) {
			needCityName.current=true
			selectNewPlace({lat: e.latlng.lat, lon: e.latlng.lng});
		}
	}

	useEffect(() =>{
		let DefaultIcon = L.icon({
			iconUrl: icon,
			shadowUrl: iconShadow
		})
		L.Marker.prototype.options.icon = DefaultIcon
	}, [])

	return (
		<LeafletMap className="map"
				ref={refMap}
				center={[lat, lon]}
				zoom={currentZoom.current}
				maxZoom={18}
				attributionControl={true}
				zoomControl={true}
				doubleClickZoom={false}
				scrollWheelZoom={true}
				dragging={true}
				animate={true}
				easeLinearity={0.35}
				onDblClick={clickMap}
			>
				<TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
				<Marker position={[lat, lon]}>
					<Popup>
						{lat}&#176;, {lon}&#176;
					</Popup>
				</Marker>
			</LeafletMap>
	)
}

export default WeatherMap;