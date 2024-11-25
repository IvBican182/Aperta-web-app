import { RootState, useAppDispatch } from "../Redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getGroupsWithUsers } from "../Redux/groupSlice";
import style from "./GroupTable.module.css";

export default function GroupTable({ clubId, groups  }: { clubId: number, groups: any }) {
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

    const maxUsers = Math.max(...groupsWithUsers.map((group: any) => group.users.length));

    return(
        <>
        {/* <div>
            {groupsWithUsers.map((group:any) => (
                <div key={group.id}>
                    <h2>{group.name}</h2>
                    <ul>
                        {group.users && group.users.map((user:any) => (
                            <li key={user.id}>
                                {user.firstName + user.lastName} ({user.email})
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div> */}
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
                    {/* Render user rows */}
                    {Array.from({ length: maxUsers }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {groups.map((group: any) => (
                                <td key={group.id}>
                                    {group.users && group.users[rowIndex] ? `${group.users[rowIndex].firstName} ${group.users[rowIndex].lastName}` : "-"}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}