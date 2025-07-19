import React from 'react';

const Unauthorized = () => {
    return (
          <div className="text-center text-red-500 mt-10">
    <h1 className="text-3xl font-bold">403 - Unauthorized</h1>
    <p>You do not have permission to view this page.</p>
  </div>
    );
};

export default Unauthorized;