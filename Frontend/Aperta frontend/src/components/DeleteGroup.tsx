import { useState, useEffect } from "react";
import { deleteGroup } from "../Redux/groupSlice";
import { useAppDispatch } from "../Redux/store";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

export default function DeleteGroup({ fetchGroups, groups } : {fetchGroups : any, groups: any}) {

    const { club } = useSelector((state: RootState) => state.club);
    
    const clubId = club?.id

    const dispatch = useAppDispatch();

    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

    useEffect(() => {
        if (!clubId) return; // Don't fetch if clubId is not available
        fetchGroups();
        
    }, [dispatch, clubId])

    const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGroupId(Number(e.target.value)); // Update selected group ID
    };

    async function handleGroupDelete() {
        if (!selectedGroupId || !clubId
        ) {
            alert("Please provide all required details.");
            return;
        }

        try {
            // Dispatch the thunk and await the result
            const resultAction = await dispatch(deleteGroup(selectedGroupId));
    
            if (deleteGroup.rejected.match(resultAction)) {
                // Handle rejection
                const errorMessage = resultAction.payload?.message || "Failed to delete the group.";
                alert(`Error: ${errorMessage}`);
            } else if (deleteGroup.fulfilled.match(resultAction)) {
                // Handle success
                alert("Group deleted successfully!");
            }
        } catch (err) {
            // Catch unexpected errors
            console.error("Unexpected error deleting group:", err);
            alert("An unexpected error occurred while deleting the group.");
        }

        /* dispatch(
            deleteGroup(selectedGroupId)
        )
            .unwrap()
            .then(() => {
                alert("group deleted successfully!");
            })
            .catch((err) => {
                console.error("Error deleting group:", err);
                alert(`Error: ${err.message || err}`);
            }); */
    }


    return (
        <>
          <div>
            <label htmlFor="group">Select Group:</label>
            <select value={selectedGroupId || ''} onChange={handleGroupChange}>
                <option value="" disabled>Select a group</option>
                {groups.map((group: any) => (
                <option key={group.id} value={group.id}>
                    {group.name}
                </option>
                ))}
            </select>      
        </div>
        <button onClick={handleGroupDelete}>Delete group</button>
        </>
    )
}