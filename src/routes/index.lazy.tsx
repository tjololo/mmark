import { createLazyFileRoute } from '@tanstack/react-router'
import {CircleMarker, MapContainer, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {DefaultTileLayer} from "../constants/leafletConstants";

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className={"mapContainer"}>
        <MapContainer center={[66.10671, 13.6980]} zoom={12} scrollWheelZoom={true} style={{ height: "100%", width: "100%"}}>
            <TileLayer {...DefaultTileLayer} />
            <MyMarker />
        </MapContainer>
        </div>
    )
}

function MyMarker() : React.JSX.Element {
    const positions = getMarkerPositions();
    return (
        <>
            {positions.map((mp) => {
                return (
                    <CircleMarker center={[mp.lat,mp.lon]} pathOptions={{color: 'red', fillColor: 'red'}} radius={5}>
                        <Popup>
                            {mp.text}
                        </Popup>
                    </CircleMarker>
                )
            })}
        </>
    )
}

type MarkedPosition = {
    lat: number,
    lon: number,
    text: string
}

function getMarkerPositions() : MarkedPosition[] {
    return [
        {lat: 66.10671, lon: 13.6980, text: "First marker"},
        {lat: 66.10671, lon: 13.7080, text: "Second marker"},
        {lat: 66.10671, lon: 13.7180, text: "Third marker"},
        {lat: 66.10671, lon: 13.7280, text: "Fourth marker"},
    ]
}