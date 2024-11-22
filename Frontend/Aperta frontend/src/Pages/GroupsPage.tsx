import { useAppDispatch } from "../Redux/store"
import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { createGroup, getAllGroups } from "../Redux/groupSlice";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { sendUserInvitation } from "../Redux/invitationSlice";
import { ROLE_ID } from "../config/roles";


export default function GroupsPage() {
    const dispatch = useAppDispatch();

    const { club } = useSelector((state: RootState) => state.club);
    
    const clubId = club?.id

    console.log(club);

    console.log(clubId);
    
    

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
                roleId: ROLE_ID.USER
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


    const submitGroup = async () => {
        try {
            await dispatch(createGroup(formData.groupName)).unwrap(); // Assuming createGroup returns a promise
            // After the group is created, fetch the groups again or add the new group to state
            fetchGroups(); // Optionally you could update the state directly like below:
            // setGroups((prevGroups) => [...prevGroups, { id: newId, name: formData.groupName }]);

            // Clear the group name input field
            setFormData((prev) => ({ ...prev, groupName: '' }));
        } catch (error) {
            console.error("Error creating group:", error);
        }
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