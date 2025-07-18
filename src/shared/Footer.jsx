import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-300 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1  lg:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-3">ActiveClub</h2>
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
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="hover:text-[#00B050]"><FaFacebookF /></a>
            <a href="#" className="hover:text-[#00B050]"><FaGithub /></a>
            <a href="#" className="hover:text-[#00B050]"><FaInstagram /></a>
            <a href="#" className="hover:text-[#00B050]"><FaYoutube /></a>
          </div>
        </div>

      </div>

      <div className="mt-8 text-center text-sm text-gray-300">
        &copy; {new Date().getFullYear()} ActiveClub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
