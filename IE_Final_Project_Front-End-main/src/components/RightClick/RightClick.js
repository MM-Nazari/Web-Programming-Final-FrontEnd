import React from 'react'


const RightClick = ({x, y, deleteType}) => {
    const handleDelete = () => {
        console.log(deleteType)
    }

    return(
        <div
          style={{
            position: 'absolute',
            top: y,
            left: x,
            background: 'white',
            padding: '8px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.8)',
              zIndex: 1
          }}
        >
          <div onClick={handleDelete}>Delete</div>
        </div>
    );
}

export default RightClick;
