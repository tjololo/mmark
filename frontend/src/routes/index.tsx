import {createFileRoute} from '@tanstack/react-router'
import {CircleMarker, MapContainer, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {DefaultTileLayer} from "../constants/leafletConstants";
import {useSuspenseQuery} from "@tanstack/react-query";
import {mapMarksQueryOptions} from "../query/mapMarkers.tsx";

export const Route = createFileRoute('/')({
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(mapMarksQueryOptions),
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
    const marksQuery = useSuspenseQuery(mapMarksQueryOptions)
    const marks = marksQuery.data;
    return (
        <>
            {marks.map((mp, index) => {
                return (
                    <CircleMarker key={index} center={[mp.lat,mp.lng]} pathOptions={{color: 'red', fillColor: 'red'}} radius={5}>
                        <Popup>
                            Id: {mp.id} <br/>
                            Title: {mp?.title}
                        </Popup>
                    </CircleMarker>
                )
            })}
        </>
    )
}