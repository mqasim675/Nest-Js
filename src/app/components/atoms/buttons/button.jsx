// "use client";
// import React from "react";

// function DeleteComponent({ setPosts, posts, record }) {
//   console.log('props:', { setPosts, posts, record });
//   const handleDelete = (record) => {
//     console.log("record", record.id);
//     const updatedPosts = posts.filter((item) => item.id !== record.id);
//     setPosts(updatedPosts);
//     onDelete(record);
//   };

//   return (
//     <button
//       onClick={handleDelete}
//       className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-100"
//     >
//       Delete
//     </button>
//   );
// }

// export default DeleteComponent;
"use client";
import React from "react";

function DeleteComponent({ setPosts, posts, record }) {
  // console.log('props:', { setPosts, posts, record });
  const handleDelete = () => {
    console.log("record", record.id);
    const updatedPosts = posts.filter((item) => item.id !== record.id);
    setPosts(updatedPosts);
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-100"
    >
      Delete
    </button>
  );
}

export default DeleteComponent;
