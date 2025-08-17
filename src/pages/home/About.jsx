import { FaHistory, FaBullseye, FaLightbulb } from "react-icons/fa";
import about from '../../assets/about.jpg'
import SectionTitle from "../../shared/SectionTitle";

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
        <SectionTitle title={'About Us'}/>
        
      </div>

     <div className=" md:flex justify-between items-center gap-8 xl:gap-10">
      <img src={about} alt="" className="hidden lg:block max-w-[450px] min-h-[450px] max-h-[400px] object-cover object-center rounded-xl"/>
     <div className="flex flex-col gap-8">
       <p className="text-3xl sm:text-4xl lg:text-5xl baby font-medium max-w-xl mx-auto tracking-wide">
          Discover our story, our purpose, and where we’re headed.
        </p>
       <div className="grid md:grid-cols-2 gap-5">
        {aboutData.map((item, index) => (
          <div
            key={index}
            className="bg-base-300 p-6 rounded-xl shadow-primary transition-all hover:shadow-md duration-300"
          >
            {item.icon}
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p >{item.description}</p>
          </div>
        ))}
      </div>
     </div>
     </div>
    </section>
  );
};

export default About;
