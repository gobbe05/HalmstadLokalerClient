import {
    Map,
} from '@vis.gl/react-google-maps'
import { useEffect, useState } from 'react';
import getPins from '../../../utils/getPins';
import Markers, { Point } from '../../map/markers';

const mapSection = ({width, height}: {width: number, height: number}) => {
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
        <div className="text-neutral">
            <div style={{height, width}}>
                <Map defaultZoom={13} defaultCenter={position} mapId={"a78e92d174ef543b "}>
                    <Markers points={points} />
                </Map>
            </div>
        </div>
    )
}

export default mapSection