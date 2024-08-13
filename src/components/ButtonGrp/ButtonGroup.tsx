import {getRandomPlate} from "../../utils/getRandomPlate.ts";
import {deletePlate, getPlates, savePlate} from "../../redux/slices/plateReducer.ts";
import {useAppDispatch, useAppSelector} from "../../redux/store.tsx";
import {useEffect} from "react";
import "./ButtonGroup.css"

interface IButtonGrp {}
const ButtonGroup = (props: IButtonGrp) => {
    const dispatch = useAppDispatch();
    const {plates} = useAppSelector(state => state.plates)

    useEffect(() => {
        dispatch(getPlates())
    }, []);

    function saveEntity() {
        const payload = getRandomPlate()
        dispatch(savePlate(payload))
    }

    function getEntity() {
        dispatch(getPlates())
    }

    function deleteEntity() {
        if (plates.length == 0) {
            console.error("no plates found")
            return;
        }

        const latestId = plates[plates.length - 1].id
        if (latestId !== undefined) {
            dispatch(deletePlate(latestId));
        }
    }

    return (
        <div className="card">
            <button onClick={() => getEntity()}>
                GET
            </button>
            <button onClick={() => saveEntity()}>
                POST
            </button>
            <button onClick={() => deleteEntity()}>
                DELETE
            </button>
        </div>
    )
}

export default ButtonGroup;