import { FaHistory, FaBullseye, FaLightbulb } from "react-icons/fa";
import about from "../../assets/about.jpg";
import SectionTitle from "../../shared/SectionTitle";
import { motion } from "framer-motion";

const aboutData = [
  {
    icon: <FaBullseye className="text-3xl text-primary mb-4" />,
    title: "Our Mission",
    description:
      "To create inclusive, modern facilities that promote physical activity, team spirit, and a strong community bond.",
  },
  {
    icon: <FaLightbulb className="text-3xl text-primary mb-4" />,
    title: "Our Vision",
    description:
      "To inspire generations through sports, encouraging a healthy and connected lifestyle for all.",
  },
];

const About = () => {
  return (
    <section className=" px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <SectionTitle title={"About Us"} />
      </div>

      <div className=" md:flex justify-between items-center gap-8 xl:gap-10">
        <img
          data-aos="fade-right"
          data-aos-delay="100"
          src={about}
          alt="Happy Player"
          className="hidden lg:block max-w-[450px] min-h-[450px] max-h-[400px] object-cover object-center rounded-xl border-3 border-primary/60 "
        />

        <div className="flex flex-col gap-8">
          <p
            data-aos="fade-left"
            data-aos-delay="100"
            className="text-3xl sm:text-4xl lg:text-5xl baby font-medium max-w-xl mx-auto tracking-wide text-shadow-[2px_2px_10px_rgb(0_0_0/0.10)] text-shadow-primary/80"
          >
            Discover our story, our purpose, and where we’re headed.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {aboutData.map((item, index) => (
              <div
                data-aos="fade-up"
                // viewport={{ amount: 0.3 }}
                key={index}
                className="bg-base-300 p-6 rounded-xl shadow-primary/70 transition-all shadow-md duration-300"
              >
                <motion.span
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                  className="inline-block"
                >
                  {item.icon}
                </motion.span>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
