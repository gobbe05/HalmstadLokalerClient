import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
import { HiBuildingOffice2 } from "react-icons/hi2";

export type Point = google.maps.LatLngLiteral & {_id: string}
type Props = {points: Point[]}

const Markers = ({points}: Props) => {
    const map = useMap();
    const [markers, setMarkers] = useState<{[key: string]: Marker}>({})
    const clusterer = useRef<MarkerClusterer|null>(null)

    useEffect(() => {
        if(!map) return
        if(!clusterer.current) {
            clusterer.current = new MarkerClusterer({map})
        }
    }, [map])

    useEffect(() => {
        clusterer.current?.clearMarkers()
        clusterer.current?.addMarkers(Object.values(markers))
    }, [markers])

    const setMarkerRef = (marker: Marker | null, key: string) => {
        if (marker && markers[key]) return;
        if (!marker && !markers[key]) return;

        setMarkers((prev ) => {
            if(marker) {
                return {...prev, [key]: marker}
            } else {
                const newMarkers = {...prev}
                delete newMarkers[key]
                return newMarkers;
            }
        })
    }

    return (
        <>
            {points.map((point) => (
                <AdvancedMarker position={point} key={point._id} ref={marker => setMarkerRef(marker, point._id)}>
                    <HiBuildingOffice2 size={36}/>
                </AdvancedMarker>
            ))}
        </>
    )
}

export default Markers