import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import bgImage from '../../assets/newsletter.jpg'
import useAxios from "../../hooks/useAxios";

const Newsletter = () => {
  const { register, handleSubmit, reset } = useForm();
  const axios = useAxios()

  const onSubmit = async(data) => {
    const subscribeData = {
         ...data , 
      subscribe_time : new Date().toISOString()
    }
    const res = await axios.post('/subscribe' , subscribeData)
    console.log("Subscribed email:", subscribeData, res.data);
    toast.success(res.data.message);
    reset();
  };

  return (
    <section
      className="my-24 mt-30 md:my-30 relative bg-cover bg-center py-24 xl:py-28 bg-no-repeat w-full"
      style={{ backgroundImage: `linear-gradient(to right, #00000040, #144272),url(${bgImage})` }}
    >
        {/* <img src={bgImage} alt="" /> */}
      <div className=" w-full h-full absolute top-0 left-0"></div>

      <div className="relative container mx-auto px-8 flex flex-col md:flex-row items-center justify-end gap-8">
        {/* Right Side Text & Form */}
        <div className="w-full md:w-8/12 lg:w-5/8 xl:w-1/2 text-white space-y-4 xl:space-y-7">
          <h2 className="text-4xl md:text-[40px] xl:text-5xl font-bold"
          data-aos='fade-down' 
          data-aos-duration='1000'
     data-aos-delay="180"
          >Subscribe to Our Newsletter</h2>
          <p className="lg:text-lg"
          data-aos="fade-up"
            data-aos-delay="150">
            Get the latest updates on court availability, promotions, and special
            sports events delivered straight to your inbox.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-2 mt-4"
              data-aos="fade-up"
            data-aos-delay="180"
          >
            <input
              type="email"
              placeholder="Enter your email" 
              {...register("subscriber_email", { required: true })}
              className="input input-bordered w-full sm:w-auto flex-1 text-black py-2 xl:py-5"
            />
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-gray-300 mt-2"
          data-aos="fade-up"
            data-aos-delay="200"
          >
            We respect your privacy. No spam ever.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
