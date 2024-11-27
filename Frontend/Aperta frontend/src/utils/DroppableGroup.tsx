import { useDroppable } from "@dnd-kit/core";
import DraggableUser from "./DraggableUser";

const DroppableGroup = ({ group }: { group: any }) => {
    const { setNodeRef } = useDroppable({
        id: group.id.toString(),
        data: group.name
        
        
    });

    return (
        <div ref={setNodeRef} style={{ minHeight: '200px', border: '1px solid #ccc' }}>
            {group.users.map((user: any) => (
                <DraggableUser key={user.id} data={user} />
            ))}
        </div>
    );
};

export default DroppableGroup;