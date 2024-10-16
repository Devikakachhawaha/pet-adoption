import React, { useEffect, useState } from 'react';


const TableData = () => {
  
  const [submissions, setSubmissions] = useState([]);
  

  
  useEffect(() => {
    const storedSubmissions = JSON.parse(localStorage.getItem("submissions")) || [];
    setSubmissions(storedSubmissions);
  }, []);

  return (
    <div className="p-3 max-h-screen" >
<div className='h-auto bg-yellow-100 bg-opacity-70 p-4 rounded-lg '>
      <h1 className="text-2xl font-bold mb-4 text-center">Submissions</h1>
      {submissions.length > 0 ? (
        <div  className="overflow-y-auto" 
        style={{ height: '350px' }}>
        <table className="min-w-full border-2 border-black">
          <thead>
            <tr>
              <th className="border-2 border-black">Pet Name</th>
              <th className="border-2 border-black">Type</th>
              <th className="border-2 border-black">Breed</th>
              <th className="border-2 border-black">Your Name</th>
              <th className="border-2 border-black">Email</th>
              <th className="border-2 border-black">Phone</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={index}>
                <td className="border-2 border-black text-center">{submission.petName}</td>
                <td className="border-2 border-black  text-center">{submission.category}</td>
                <td className="border-2 border-black text-center">{submission.breed}</td>
                <td className="border-2 border-black text-center">{submission.yourName}</td>
                <td className="border-2 border-black text-center">{submission.email}</td>
                <td className="border-2 border-black  text-center">{submission.phone}</td>
              </tr>
            ))}
           
          </tbody>
        </table>
        </div>
      ) : (
        <p>No submissions available.</p>
      )}
      </div>
    </div>
  );
};

export default TableData;
