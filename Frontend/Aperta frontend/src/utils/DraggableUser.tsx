import { useDraggable } from "@dnd-kit/core";

const DraggableUser = ({ data }: { data: any}) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: data.id.toString(),
        data: data, 
    });

    const draggableStyle = {
        padding: '10px',
        marginBottom: '8px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        cursor: 'move', // Add cursor for draggable elements
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : 'none',
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={draggableStyle}
        >
            {data.firstName} {data.lastName}
        </div>
    );
};

export default DraggableUser;