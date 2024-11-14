import { useAppDispatch } from "../Redux/store"
import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { createGroup, getAllGroups } from "../Redux/groupSlice";


export default function GroupsPage() {
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        groupName: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((preValue) => {
            return {
                ...preValue,
                [e.target.name]: e.target.value
            }

        });

    };

    function submitGroup() {
        dispatch(createGroup( formData.groupName ))
    }

    useEffect(() => {
        dispatch(getAllGroups());
    }, [])



    return (
        <div>
        <p>groups</p>
        <div>
            <label>Type group name :</label>
            <input
                type="text"
                name="groupName"
                value={formData.groupName}
                onChange={handleChange}
                required
            />
        </div>
        <button onClick={submitGroup}>Add group</button>
        
        </div>
        
    )
}