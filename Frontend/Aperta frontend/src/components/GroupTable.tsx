import { RootState, useAppDispatch } from "../Redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getGroupsWithUsers, updateUserGroup } from "../Redux/groupSlice";
import style from "./GroupTable.module.css";
import { DndContext } from '@dnd-kit/core';
import DroppableGroup from "../utils/DroppableGroup";
import { DragEndEvent } from "@dnd-kit/core";

export default function GroupTable({ clubId  }: { clubId: number, groups: any }) {
    const dispatch = useAppDispatch();

    const { groupsWithUsers, isLoading, error } = useSelector((state: RootState) => state.group);

    useEffect(() => {
        
        const fetchGroupsWithUsers = async () => {
            await dispatch(getGroupsWithUsers(clubId)).unwrap();
        };
        

        fetchGroupsWithUsers();
    }, [dispatch, clubId]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    //const maxUsers = Math.max(...groupsWithUsers.map((group: any) => group.users.length));

  /*   const onDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        console.log("Active item being dragged:", active);
        console.log("Item being hovered over:", over);

        // If dropped outside a valid group, do nothing
        if (!over) return;

        // If dropped in the same group and same position, do nothing
        if (active.id === over.id) return;

        // Find the source and destination groups
        const sourceGroupIndex = groupsWithUsers.findIndex(group => group.id === active.id);
        const destinationGroupIndex = groupsWithUsers.findIndex(group => group.id === over.id);

        if (sourceGroupIndex === -1 || destinationGroupIndex === -1) return;

        const sourceGroup = groupsWithUsers[sourceGroupIndex];
        const destinationGroup = groupsWithUsers[destinationGroupIndex];

        // Find the index of the dragged user in the source group
        const userIndex = sourceGroup.users.findIndex((user: any) => user.id === active.id);

        // If the user is found, move the user to the destination group
        if (userIndex !== -1) {
            const movedUser = sourceGroup.users[userIndex];

            // Remove the user from the source group
            sourceGroup.users.splice(userIndex, 1);

            // Add the user to the destination group at the dropped position
            destinationGroup.users.push(movedUser);

            // Update state
            const updatedGroups = [...groupsWithUsers];
            updatedGroups[sourceGroupIndex] = sourceGroup;
            updatedGroups[destinationGroupIndex] = destinationGroup;

            // Update the database with the new group assignment
            await dispatch(updateUserGroup({ userId: movedUser.id, groupId: destinationGroup.id })).unwrap();
        }
    }; */

    const onDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        console.log("groups with users" + JSON.stringify(groupsWithUsers, null, 2));

        console.log("Active item being dragged:", active);
        console.log("Item being hovered over:", over);
    
        // Log to check if onDragEnd is triggered
        console.log("onDragEnd triggered");
        console.log("groups with users" + JSON.stringify(groupsWithUsers, null, 2));
    
        if (!over) return;
    
        // Find the source and destination groups
        const sourceGroup = groupsWithUsers.find(group => 
            group.users.some((user: any) => user.id === active.id)
        );
        console.log(sourceGroup);
        const destinationGroup = groupsWithUsers.find((group) => group.id == over.id);
        console.log(destinationGroup);
    
        if (sourceGroup && destinationGroup) {
            const movedUser = sourceGroup.users.find((user: any) => user.id == active.id);
            if (movedUser) {
                // Log to check if the user ID and group ID are being passed correctly
                console.log("Dispatching updateUserGroup with userId:", movedUser.id, "and groupId:", destinationGroup.id);
                console.log(typeof(movedUser.id));
                // Dispatch the asyncThunk
                await dispatch(updateUserGroup({ userId: movedUser.id , groupId: destinationGroup.id }));
                
    
                // Log after dispatch
                console.log("Dispatch call completed");
            }
        }
    };



    return(
        <>
        {/* <div className={style.tableContainer}>
            <table className={style.groupTable}>
                <thead>
                    <tr>
                        {groupsWithUsers.map((group: any) => (
                            <th key={group.id}>{group.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Render user rows */}
                     {/* {Array.from({ length: maxUsers }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {groupsWithUsers.map((group: any) => (
                                <td key={group.id}>
                                    {group.users && group.users[rowIndex] ? `${group.users[rowIndex].firstName} ${group.users[rowIndex].lastName}` : "-"}
                                    
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> */} 
        <DndContext onDragEnd={onDragEnd}>
            <div className={style.tableContainer}>
                <table className={style.groupTable}>
                    <thead>
                        <tr>
                            {groupsWithUsers.map((group: any) => (
                                <th key={group.id}>{group.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                {groupsWithUsers.map((group: any) => (
                                    <td key={group.id}>
                                        <DroppableGroup group={group} />
                                    </td>
                                ))}
                            </tr>
                    </tbody>
                </table>
            </div>
        </DndContext>
        </>
    )
}