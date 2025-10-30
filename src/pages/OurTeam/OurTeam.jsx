import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaTwitter, FaLinkedin, FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loading from "../../shared/Loading";
import team from '../../assets/team.jpg'
import SectionTitle from "../../shared/SectionTitle";


const fetchTeamMembers = async () => {
  return [
    {
      id: 1,
      name: "Md. Rahim Khan",
      role: "Head Coach",
      bio: "Former national player with 10+ years of coaching experience. Specialized in strategic gameplay.",
      image: "https://i.ibb.co.com/JRVBM1Hn/gardener8.jpg",
      social: {
        twitter: "rahimcoach",
        email: "rahim@example.com",
      },
      joinDate: "2020-03-15",
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      role: "Fitness Trainer",
      bio: "Sports science expert from Dhaka University. Trained 50+ athletes for international competitions.",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      social: {
        instagram: "nusrat_fitness",
        linkedin: "nusrat-akter",
      },
      joinDate: "2021-07-22",
    },
    {
      id: 3,
      name: "Shafiq Ahmed",
      role: "Data Analyst",
      bio: "Analyzes player performance using AI models. Previously worked with BPL teams.",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      social: {
        linkedin: "shafiq-analytics",
        email: "shafiq@example.com",
      },
      joinDate: "2019-11-05",
    },
    {
      id: 4,
      name: "Tasnim Rahman",
      role: "Physiotherapist",
      bio: "Specialized in injury recovery. Certified from Australia Sports Institute.",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      social: {
        facebook: "tasnim.therapy",
        email: "tasnim@example.com",
      },
      joinDate: "2022-01-30",
    },
  ];
};

export default function OurTeam() {
  const { data: teamMembers, isLoading, error } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: fetchTeamMembers,
  });


  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  if (isLoading) return <Loading/>
  if (error) toast.error("Failed to load team data");

  return (
   <div className="">
    <div className="">
         {/* <img src={team} alt="" className="max-h-screen w-full object-cover object-center" /> */}
    </div>
     <div className="min-h-screen bg-base-100 py-16 md:py-20 lg:py-26 xl:py-30 px-4 sm:px-6 lg:px-8">
       
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div 
          className="text-center mb-16" 
          data-aos="fade-down"
        >
            <SectionTitle title={'Our Team'}/>
          {/* <h1 className="text-4xl font-bold text-primary mb-4">Our Team</h1>
          <p className="text-lg opacity-80">
            Meet the experts behind your success
          </p> */}
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers?.map((member, index) => (
            <div
              key={member.id}
              className="card bg-base-300 shadow-xl hover:shadow-2xl transition-shadow"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <figure className="px-6 pt-6">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="object-cover"
                    />
                  </div>
                </div>
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl">{member.name}</h2>
                <div className="badge badge-primary badge-lg mt-2">
                  {member.role}
                </div>
                <p className="mt-4">{member.bio}</p>
                <div className="card-actions mt-4">
                  {/* social */}
                  <div className="flex gap-4">
                    {member.social?.twitter && (
                      <a 
                        href={`https://twitter.com/${member.social.twitter}`} 
                        target="_blank"
                        className="btn btn-circle btn-ghost hover:text-blue-400"
                      >
                        <FaTwitter size={20} />
                      </a>
                    )}
                    {member.social?.linkedin && (
                      <a 
                        href={`https://linkedin.com/in/${member.social.linkedin}`} 
                        target="_blank"
                        className="btn btn-circle btn-ghost hover:text-blue-600"
                      >
                        <FaLinkedin size={20} />
                      </a>
                    )}
                    {member.social?.instagram && (
                      <a 
                        href={`https://instagram.com/${member.social.instagram}`} 
                        target="_blank"
                        className="btn btn-circle btn-ghost hover:text-pink-500"
                      >
                        <FaInstagram size={20} />
                      </a>
                    )}
                    {member.social?.facebook && (
                      <a 
                        href={`https://facebook.com/${member.social.facebook}`} 
                        target="_blank"
                        className="btn btn-circle btn-ghost hover:text-blue-700"
                      >
                        <FaFacebook size={20} />
                      </a>
                    )}
                    {member.social?.email && (
                      <a 
                        href={`mailto:${member.social.email}`}
                        className="btn btn-circle btn-ghost hover:text-red-500"
                      >
                        <FaEnvelope size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
   </div>
  );
}