import {
  FaMapMarkerAlt,
  FaDirections,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
import SectionTitle from "../../shared/SectionTitle";

const Location = () => {
  const clubName = "Active Club";
  const address = ` Active Club,
House #12, Road #5,
Namasheri, Khilgaon, Dhaka-1219,
Bangladesh`;
  const mapUrl = "https://maps.app.goo.gl/CiyxJAhgPuTzudwf6";
  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d24374.07720270178!2d90.415238!3d23.804093!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c795a0c5336f%3A0x142fb37c5fd1667d!2sNamasheri%20Active%20Club!5e1!3m2!1sen!2sbd!4v1752830665420!5m2!1sen!2sbd";

  return (
    <section className="py-12 lg:py-16 " id="location">
      <div className="container mx-auto px-4">
        {/* <SectionTitle title={'Location'}/> */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* //content */}
          <div className="text-center md:text-left ">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider baby mb-6">
              <FaMapMarkerAlt className="inline-block mr-2 text-primary" />
              Our Location
            </h2>
            {/* Address */}
            <div className=" space-y-2 mb-4 max-w-96">
              <p className="text-xl md:text-2xl font-semibold">{clubName}</p>
              <p className="text-sm">{address}</p>

              <div className="flex justify-center gap-4 flex-wrap md:justify-start">
                <p className="flex items-center gap-2">
                  <FaPhoneAlt className="text-primary" /> +880 1234-567890
                </p>
                <p className="flex items-center gap-2">
                  <FaClock className="text-primary" /> Open: 7:00 AM – 10:00 PM
                </p>
              </div>
            </div>

            {/* Navigate to Google Maps */}
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary gap-2"
            >
              <FaDirections />
              View in Google Maps
            </a>
          </div>
          {/* Google Map Embed */}
          <div className="md:w-1/2 lg:w-3/5 h-90 lg:h-[400px] rounded-xl overflow-hidden mb-6 shadow-lg ">
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title=" Active Club Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
