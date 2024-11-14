import {
    APIProvider,
    Map,
} from '@vis.gl/react-google-maps'
import { useEffect, useState } from 'react';
import getPins from '../../../utils/getPins';
import Markers, { Point } from '../../map/markers';

const mapSection = () => {
    const position = {lat: 56.6744, lng: 12.8578 };
    const [points, setPoints] = useState<Array<Point>>([])

    const fetchPins= async () => {
        const pins = await getPins()
        setPoints(pins)
    }

    useEffect(() => {
        fetchPins()
    }, []) 
    return (
        <div className="mt-16">
        <h1></h1>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
            <div style={{height: 600, width: 600}}>
                <Map defaultZoom={13} defaultCenter={position} mapId={"a78e92d174ef543b "}>
                    <Markers points={points} />
                </Map>
            </div>
        </APIProvider>
        </div>
    )
}

export default mapSection