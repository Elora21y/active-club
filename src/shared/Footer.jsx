import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="text-white bg-base-300">
      <footer className=" px-4 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1  lg:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
          <div className="flex gap-1 items-end mb-2">
            <img src="/favicon.png" alt="" className='w-12 h-12'/>
            <h2 className="text-2xl font-bold mb-3">ActiveClub</h2>
          </div>
          <p className="text-sm">
            Empowering your sports journey with efficient club management. Stay active, stay connected.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <ul className="text-sm space-y-2">
            <li><span className="font-semibold">Email:</span> support@activeclub.com</li>
            <li><span className="font-semibold">Phone:</span> +880 1234 567890</li>
            <li><span className="font-semibold">Address:</span> 123 Sports Arena Road, Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-2xl social">
             <a href="https://www.facebook.com/elora.yasmin.21" target="_blank"><FaFacebookF /></a>
            <a href="https://github.com/Elora21y" target="_blank"><FaGithub /></a>
            <a href="https://www.instagram.com/ajanta__elora/" target="_blank"><FaInstagram /></a>
             <a href="https://www.youtube.com/@elora256" target="_blank"><FaYoutube /></a>
          </div>
        </div>

      </div>

    </footer>
    
      <div className="py-8 text-center text-sm">
        &copy; {new Date().getFullYear()} ActiveClub. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
