import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import bgImage from '../../assets/newsletter.jpg'

const Newsletter = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Subscribed email:", data.email);
    toast.success("Successfully subscribed!");
    reset();
  };

  return (
    <section
      className="mt-30 relative bg-cover bg-center py-30 bg-no-repeat "
      style={{ backgroundImage: `linear-gradient(to right, #427D9D10, #144272),url(${bgImage})` }}
    >
        {/* <img src={bgImage} alt="" /> */}
      <div className=" w-full h-full absolute top-0 left-0"></div>

      <div className="relative container mx-auto px-4 flex flex-col md:flex-row items-center justify-end gap-8">
        {/* Right Side Text & Form */}
        <div className="w-full md:w-1/2 text-white space-y-4">
          <h2 className="text-4xl font-bold">Subscribe to Our Newsletter</h2>
          <p className="text-lg">
            Get the latest updates on court availability, promotions, and special
            sports events delivered straight to your inbox.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-2 mt-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="input input-bordered w-full sm:w-auto flex-1 text-black"
            />
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-gray-300 mt-2">
            We respect your privacy. No spam ever.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
