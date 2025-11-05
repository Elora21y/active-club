// import React, { useState, useEffect } from 'react';
// import toast from 'react-hot-toast';
// import { FaStar, FaPaperPlane } from 'react-icons/fa';
// import { MdFeedback } from 'react-icons/md';
// import { useNavigate } from 'react-router';
// import Swal from 'sweetalert2';
// import useAuth from '../../hooks/useAuth';
// import useAxiosSecure from '../../hooks/useAxiosSecure';

// const GiveFeedback = () => {
//   const { user, loading } = useAuth();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();
  
//   const [rating, setRating] = useState(0);
//   const [hoveredRating, setHoveredRating] = useState(0);
//   const [submitting, setSubmitting] = useState(false);
//   const [charCount, setCharCount] = useState(0);

//   const userRoles = [
//     'Club Member',
//     'Regular Player', 
//     'Tournament Participant',
//     'New User',
//     'Coach/Trainer'
//   ];

//   const experienceAreas = [
//     'Overall Experience',
//     'Court Booking System',
//     'Payment Process',
//     'Court Quality',
//     'Staff Service',
//     'Website/App Usability',
//     'Facilities & Amenities',
//     'Other'
//   ];

//   // Check if user is logged in
//   useEffect(() => {
//     if (!loading && !user) {
//       toast.error('Please login to submit feedback');
//       navigate('/auth/login');
//     }
//   }, [user, loading, navigate]);

//   // Show loading while checking auth
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   // If not logged in, don't render form
//   if (!user) {
//     return null;
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (rating === 0) {
//       toast.error('Please provide a rating!');
//       return;
//     }

//     const form = e.target;
//     const feedbackData = {
//       user_id: user.uid,
//       name: user.displayName || 'Anonymous',
//       email: user.email,
//       user_photo: user.photoURL || '',
//       user_role: form.userRole.value,
//       experience_area: form.experienceArea.value,
//       location: form.location.value || '',
//       rating: rating,
//       message: form.message.value,
//       would_recommend: form.wouldRecommend.checked,
//       status: 'pending',
//       created_at: new Date().toISOString(),
//     };

//     setSubmitting(true);

//     try {
//       const res = await axiosSecure.post('/feedback', feedbackData);
      
//       if (res.data?.insertedId) {
//         Swal.fire({
//           title: 'Thank You!',
//           text: 'Your feedback has been submitted successfully.',
//           icon: 'success',
//           confirmButtonText: 'OK',
//           confirmButtonColor: '#3b82f6',
//         }).then(() => {
//           navigate('/feedback/success');
//         });
        
//         form.reset();
//         setRating(0);
//         setCharCount(0);
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.error || 'Failed to submit feedback');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getRatingText = () => {
//     const ratings = {
//       5: { text: 'Excellent! ⭐', color: 'text-green-400' },
//       4: { text: 'Very Good! 👍', color: 'text-blue-400' },
//       3: { text: 'Good 😊', color: 'text-yellow-400' },
//       2: { text: 'Fair 😐', color: 'text-orange-400' },
//       1: { text: 'Needs Improvement 😔', color: 'text-red-400' }
//     };
//     return ratings[rating] || { text: '', color: '' };
//   };

//   return (
//     <div className="min-h-screen py-16 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-10">
//           <div className="flex justify-center mb-4">
//             <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
//               <MdFeedback className="text-5xl text-white" />
//             </div>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
//             Share Your Experience
//           </h1>
//           <p className="text-gray-400 text-lg">
//             Help us improve Active Club - Your feedback matters!
//           </p>
//         </div>

//         {/* Feedback Form Card */}
//         <div className="bg-base-100 rounded-2xl shadow-2xl p-8 md:p-10">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* User Info Display */}
//             <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
//               {user?.photoURL ? (
//                 <img 
//                   src={user.photoURL} 
//                   alt="User" 
//                   className="w-14 h-14 rounded-full border-2 border-primary" 
//                 />
//               ) : (
//                 <div className="avatar placeholder">
//                   <div className="bg-primary text-neutral-content rounded-full w-14">
//                     <span className="text-xl">{user?.displayName?.[0] || 'U'}</span>
//                   </div>
//                 </div>
//               )}
//               <div>
//                 <p className="font-semibold text-lg">{user?.displayName}</p>
//                 <p className="text-sm opacity-70">{user?.email}</p>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               {/* User Role */}
//               <div>
//                 <label className="label font-semibold">
//                   <span className="label-text">You are a *</span>
//                 </label>
//                 <select
//                   name="userRole"
//                   className="select select-bordered w-full"
//                   required
//                   defaultValue="Club Member"
//                 >
//                   {userRoles.map((role) => (
//                     <option key={role} value={role}>
//                       {role}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Experience Area */}
//               <div>
//                 <label className="label font-semibold">
//                   <span className="label-text">Feedback About *</span>
//                 </label>
//                 <select
//                   name="experienceArea"
//                   className="select select-bordered w-full"
//                   required
//                   defaultValue="Overall Experience"
//                 >
//                   {experienceAreas.map((area) => (
//                     <option key={area} value={area}>
//                       {area}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Location (Optional) */}
//             <div>
//               <label className="label font-semibold">
//                 <span className="label-text">Location (Optional)</span>
//               </label>
//               <input
//                 type="text"
//                 name="location"
//                 placeholder="e.g., Dhaka, Bangladesh"
//                 className="input input-bordered w-full"
//               />
//             </div>

//             {/* Rating Section */}
//             <div>
//               <label className="label font-semibold">
//                 <span className="label-text">Rate Your Experience *</span>
//               </label>
//               <div className="flex items-center gap-2 mb-2">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <button
//                     key={star}
//                     type="button"
//                     onClick={() => setRating(star)}
//                     onMouseEnter={() => setHoveredRating(star)}
//                     onMouseLeave={() => setHoveredRating(0)}
//                     className="transition-all duration-200 hover:scale-110 focus:outline-none"
//                   >
//                     <FaStar
//                       className={`text-4xl ${
//                         star <= (hoveredRating || rating)
//                           ? 'text-yellow-400 drop-shadow-lg'
//                           : 'text-gray-600'
//                       }`}
//                     />
//                   </button>
//                 ))}
//                 {rating > 0 && (
//                   <span className="ml-3 text-xl font-bold text-yellow-400">
//                     {rating} / 5
//                   </span>
//                 )}
//               </div>
//               {rating > 0 && (
//                 <p className={`text-sm font-semibold ${getRatingText().color}`}>
//                   {getRatingText().text}
//                 </p>
//               )}
//             </div>

//             {/* Feedback Message */}
//             <div>
//               <label className="label font-semibold">
//                 <span className="label-text">Your Detailed Feedback *</span>
//               </label>
//               <textarea
//                 name="message"
//                 rows="6"
//                 placeholder="Tell us about your experience with Active Club... What did you like? What can we improve?"
//                 className="textarea textarea-bordered w-full resize-none"
//                 required
//                 minLength={20}
//                 maxLength={1000}
//                 onChange={(e) => setCharCount(e.target.value.length)}
//               />
//               <div className="flex justify-between items-center mt-2">
//                 <span className="text-xs opacity-60">Minimum 20 characters</span>
//                 <span className={`text-sm ${charCount > 1000 ? 'text-error' : 'opacity-60'}`}>
//                   {charCount} / 1000 characters
//                 </span>
//               </div>
//             </div>

//             {/* Would Recommend */}
//             <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
//               <input
//                 type="checkbox"
//                 name="wouldRecommend"
//                 className="checkbox checkbox-primary"
//               />
//               <label className="font-medium cursor-pointer">
//                 I would recommend Active Club to others
//               </label>
//             </div>

//             {/* Submit Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="flex-1 btn btn-primary gap-2"
//               >
//                 {submitting ? (
//                   <>
//                     <span className="loading loading-spinner loading-sm"></span>
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <FaPaperPlane />
//                     Submit Feedback
//                   </>
//                 )}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => navigate(-1)}
//                 className="sm:w-32 btn btn-error btn-outline"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Additional Info */}
//         <div className="mt-8 text-center">
//           <p className="text-sm opacity-60">
//             🔒 Your feedback is confidential and helps us serve you better
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GiveFeedback;
import React from 'react';

const FeedbackForm = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-[500px]'>
      <h3 className='text-lg'>Processing...</h3>
    </div>
  );
};

export default FeedbackForm;