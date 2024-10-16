import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";

const petBreeds = {
  dog: ["Labrador Retriever", "German Shepherd", "Golden Retriever", "French Bulldog", "Beagle"],
  cat: ["Domestic Shorthair", "Siamese", "Maine Coon", "Persian", "Bengal"],
  rabbit: ["Holland Lop", "Netherland Dwarf", "Mini Rex", "Lionhead", "English Angora"],
  bird: ["Parakeet", "Cockatiel", "African Grey Parrot", "Lovebird", "Canary"],
  reptile: ["Leopard Gecko", "Bearded Dragon", "Corn Snake", "Red-Eared Slider Turtle", "Chameleon"],
  rodent: ["Hamster", "Guinea Pig", "Gerbil", "Rat", "Mouse"],
  fish: ["Betta Fish", "Goldfish", "Guppy", "Neon Tetra", "Angelfish"],
  ferret: ["Standard Ferret", "Sable Ferret", "Albino Ferret"],
  chinchilla: ["Standard Chinchilla", "Black Velvet Chinchilla"],
  hedgehog: ["African Pygmy Hedgehog"],
  turtle: ["Red-Eared Slider", "Painted Turtle"],
  pig: ["Miniature Pig", "Potbellied Pig"],
};

function PetAdoptionForm() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
    watch,
  } = useForm();

  
  useEffect(() => {
    const storedSubmissions = localStorage.getItem("petSubmissions");
    if (storedSubmissions) {
      setSubmissions(JSON.parse(storedSubmissions));
    }
  }, []);

 
  const selectedPetType = watch("category");

  const delay=(d)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve()
      },d*1000);
    })
  }

  const onSubmit = async(data) => {
    await delay(2)
    
    const existingSubmissions = JSON.parse(localStorage.getItem("submissions")) || [];
    
   
    const newSubmissions = [...existingSubmissions, data];
    setSubmissions(newSubmissions);

    
    localStorage.setItem("submissions", JSON.stringify(newSubmissions));

    // Navigate to submissions page
    navigate('/submissions');
  };

  return (
    <>
    <div className="flex w-full flex-col items-center justify-center md:p-0 lg:p-0 max-h-screen md:w-full rounded-md bg-cover  overflow-y-auto">
    {isSubmitting && <div className="bg-yellow-100 text-black p-2 rounded-sm text-sm">Loading...</div>}
      <div className="bg-yellow-100 bg-opacity-60 w-4/6 md:w-3/4 lg:w-1/3 p-3 rounded-lg overflow-y-auto " style={{ height: "460px",maxWidth:"100%" }}>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col">
           <span className="font-semibold"> Pet Name</span> 
            <input
              type="text"
              className="w-full p-1 border rounded-md"
              {...register("petName", {
                required: "This is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/i,
                  message: "Only alphabets are allowed",
                },
                minLength: {
                  value: 3,
                  message: "Pet Name must be at least 3 characters long",
                },
              })}
              placeholder="Pet Name"
            />
            <ErrorMessage
              errors={errors}
              name="petName"
              render={({ message }) => <p className="text-red-500 text-sm">{message}</p>}
            />
          </label>

          <label className="flex flex-col">
          <span className="font-semibold"> Pet Type</span>
            <select
              className="w-full p-1 border rounded-md"
              {...register("category", { required: "Please select a pet type" })}
            >
              <option value="">Select...</option>
              {Object.keys(petBreeds).map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <ErrorMessage
              errors={errors}
              name="category"
              render={({ message }) => <p className="text-red-500 text-sm">{message}</p>}
            />
          </label>

          <label className="flex flex-col">
          <span className="font-semibold"> Breed</span>
            <select
              className="w-full p-1 border rounded-md"
              {...register("breed", { required: "Please select a breed" })}
              disabled={!selectedPetType} // Disable if no pet type is selected
            >
              <option value="">Select...</option>
              {selectedPetType &&
                petBreeds[selectedPetType].map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
            </select>
            <ErrorMessage
              errors={errors}
              name="breed"
              render={({ message }) => <p className="text-red-500 text-sm">{message}</p>}
            />
          </label>

          <label className="flex flex-col">
          <span className="font-semibold">Your Name</span>
            <input
              type="text"
              className="w-full p-1 border rounded-md"
              {...register("yourName", {
                required: "This is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/i,
                  message: "Only alphabets are allowed",
                },
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long",
                },
              })}
              placeholder="Your Name"
            />
            <ErrorMessage
              errors={errors}
              name="yourName"
              render={({ message }) => <p className="text-red-500 text-sm">{message}</p>}
            />
          </label>

          <label className="flex flex-col">
          <span className="font-semibold">Email</span>
            <input
              type="email"
              className="w-full p-1 border rounded-md"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              placeholder="Email"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <p className="text-red-500 text-sm">{message}</p>}
            />
          </label>

          <label className="flex flex-col">
          <span className="font-semibold"> Phone</span>
            <input
              type="tel"
              className="w-full p-1 border rounded-md"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Please enter a valid 10-digit Indian phone number",
                },
                minLength: {
                  value: 10,
                  message: "Phone number must be 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Phone number must be 10 digits",
                },
              })}
              placeholder="Phone"
            />
            <ErrorMessage
              errors={errors}
              name="phone"
              render={({ message }) => <p className="text-red-500 text-sm">{message}</p>}
            />
          </label>

          <input disabled={isSubmitting}
            className="bg-yellow-50 bg-opacity-50 text-xl font-semibold cursor-pointer w-full p-1 border rounded-md hover:bg-yellow-200"
            type="submit"
          />
        </form>
      </div>
      
    </div>
    </>
  );
}

export default PetAdoptionForm;
