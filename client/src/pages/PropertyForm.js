// import React, { useState } from 'react';

// // Frontend Form Validation: Adjust your form to show or hide fields based on the selected category.

// function PropertyForm() {
//   const [category, setCategory] = useState('');
//   const [formData, setFormData] = useState({
//     location: '',
//     size: '',
//     price: '',
//     description: '',
//     image: '',
//     type: '',
//     status: '',
//     bedroom: '',
//     bathroom: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform form submission
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Category:
//         <select name="category" value={category} onChange={handleCategoryChange}>
//           <option value="">Select Category</option>
//           <option value="land">Land</option>
//           <option value="house">House</option>
//           <option value="townhouse">Townhouse</option>
//           <option value="apartment">Apartment</option>
//         </select>
//       </label>

//       <label>
//         Location:
//         <input type="text" name="location" value={formData.location} onChange={handleChange} required />
//       </label>

//       {category !== 'land' && (
//         <>
//           <label>
//             Bedroom:
//             <input type="number" name="bedroom" value={formData.bedroom} onChange={handleChange} required />
//           </label>
//           <label>
//             Bathroom:
//             <input type="number" name="bathroom" value={formData.bathroom} onChange={handleChange} required />
//           </label>
//         </>
//       )}

//       <label>
//         Size:
//         <input type="text" name="size" value={formData.size} onChange={handleChange} required />
//       </label>

//       <label>
//         Price:
//         <input type="number" name="price" value={formData.price} onChange={handleChange} required />
//       </label>

//       <label>
//         Description:
//         <textarea name="description" value={formData.description} onChange={handleChange} required />
//       </label>

//       <label>
//         Image URL:
//         <input type="text" name="image" value={formData.image} onChange={handleChange} required />
//       </label>

//       <label>
//         Type:
//         <select name="type" value={formData.type} onChange={handleChange} required>
//           <option value="">Select Type</option>
//           <option value="for sale">For Sale</option>
//           <option value="for rent">For Rent</option>
//         </select>
//       </label>

//       <label>
//         Status:
//         <select name="status" value={formData.status} onChange={handleChange} required>
//           <option value="">Select Status</option>
//           <option value="available">Available</option>
//           <option value="sold">Sold</option>
//         </select>
//       </label>

//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default PropertyForm;
