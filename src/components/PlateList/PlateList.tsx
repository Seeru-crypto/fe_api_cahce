import {useAppSelector} from "../../redux/store.tsx";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import "./PlateList.css"

interface IPlateList {

}
const PlateList = (props: IPlateList) => {
    const {plates} = useAppSelector(state => state.plates)
    const [parent] = useAutoAnimate(/* optional config */)

    function formatDate(createdAt: Date) {
        const test = new Date(createdAt)
        return test.toLocaleTimeString()
    }

    return (
        <ul ref={parent} className="plate-container">
            {plates.map(plate => {
                    return (
                        <li key={plate.id} className="plate">
                            <h2>{plate.letters}-{plate.plateNumbers}</h2>
                            <span>{formatDate(plate.createdAt)}</span>
                        </li>
                    )
                }
            )
            }
        </ul>
    )
}

export default PlateList;