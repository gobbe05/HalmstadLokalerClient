import { IconType } from "react-icons"

interface IOfficeTypeRingProps {
    name: string,
    Icon: IconType
}

const OfficeTypeRing = ({Icon, name}: IOfficeTypeRingProps) => {
    return (
        <div>
            <div className="grid place-content-center bg-gray-300 text-gray-700 rounded-full w-16 h-16">
                <Icon size={32}/>
            </div>
            <p className="text-center font-light">{name}</p>
        </div>
    )
}

export default OfficeTypeRing