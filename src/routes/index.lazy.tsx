import { createLazyFileRoute } from '@tanstack/react-router'
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import tileLayer from "../util/tileLayer.tsx";
import L from "leaflet";

export const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <MapContainer center={[66.10671, 13.6980]} zoom={12} scrollWheelZoom={true} style={{ height: "50vh", width:"100vh" }}>
            <TileLayer {...tileLayer} />
            <Marker position={[66.10671, 13.6980]} draggable={true} icon={DefaultIcon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}