import { useAppDispatch } from "../Redux/store"
import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { createGroup, getAllGroups } from "../Redux/groupSlice";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { sendUserInvitation } from "../Redux/invitationSlice";


export default function GroupsPage() {
    const dispatch = useAppDispatch();

    const { club } = useSelector((state: RootState) => state.club);
    
    const clubId = club?.id
    
    

    const [groups, setGroups] = useState<{ id: number; name: string }[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        groupName: '',
        Email: '',
        
    });

    const fetchGroups = async () => {
        try {
            const response = await dispatch(getAllGroups()).unwrap(); // Unwrap the fulfilled response
            setGroups(response); // Assuming response is an array of groups
        } catch (error) {
            console.error("Failed to fetch groups:", error);
        }
    };

    useEffect(() => {
        fetchGroups();
        
    }, [dispatch])


    const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGroupId(Number(e.target.value)); // Update selected group ID
    };


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((preValue) => {
            return {
                ...preValue,
                [e.target.name]: e.target.value
            }

        });

    };

    const handleInvite = () => {
        if (!formData.Email || !selectedGroupId || !clubId
        ) {
            alert("Please provide all required details.");
            return;
        }

        dispatch(
            sendUserInvitation({
                email: formData.Email,
                clubId: clubId,
                groupId: selectedGroupId,
            })
        )
            .unwrap()
            .then(() => {
                alert("Invitation sent successfully!");
            })
            .catch((err) => {
                console.error("Error sending invitation:", err);
                alert(`Error: ${err.message || err}`);
            });
    };


    function submitGroup() {
        dispatch(createGroup( formData.groupName ))
    };

    


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

        <div>
            <label>Enter player email :</label>
            <input
                type="text"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
            />
        </div>

        <div>
            <label htmlFor="group">Select Group:</label>
            <select value={selectedGroupId || ''} onChange={handleGroupChange}>
                <option value="" disabled>Select a group</option>
                {groups.map(group => (
                <option key={group.id} value={group.id}>
                    {group.name}
                </option>
                ))}
            </select>      
        </div>
        <button onClick={handleInvite}>Add player</button>
        
        </div>
        
    )
}