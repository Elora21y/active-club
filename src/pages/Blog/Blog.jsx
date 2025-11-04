
import { FaHeart, FaShareAlt, FaBookmark } from "react-icons/fa";
import { motion } from "motion/react"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { blogPosts } from "./blogData";
import SectionTitle from "../../shared/SectionTitle";

export default function Blog() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen  py-16 md:py-20 lg:py-26 xl:py-30 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* হেডার */}
        <div className="text-center mb-16" data-aos="fade-down">
         <SectionTitle title={'Sports Blog'}/>
          {/* <p className="text-lg opacity-80">Latest news, analysis, and stories from the world of sports</p> */}
        </div>

        {/* ব্লগ পোস্ট গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
          <motion.div
    //   whileHover={{ y: -5 }}
      data-aos="fade-up"
              data-aos-delay={index * 100}
      className="relative group overflow-hidden rounded-xl bg-white dark:bg-base-300 shadow-lg dark:shadow-gray-700/20"
    >
      {/* ইমেজ সেকশন (হোভার জুম ইফেক্ট) */}
      <div className="overflow-hidden h-60">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* কন্টেন্ট সেকশন */}
      <div className="p-6">
        {/* ট্যাগস (গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড) */}
        <div className="flex gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-gradient-to-r  from-cyan-400 to-blue-500 text-white rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* টাইটেল ও সাবটাইটেল (কাস্টম আন্ডারলাইন) */}
        <h2 className="text-2xl font-bold mb-2 relative inline-block">
          <span className="relative z-10">{post.title}</span>
          {/* <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 z-0 opacity-0 group-hover:opacity-100 transition-opacity"></span> */}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{post.subtitle}</p>

        {/* ডিভাইডার লাইন (অ্যানিমেটেড) */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-white dark:bg-gray-800 text-sm text-gray-500">•••</span>
          </div>
        </div>

        {/* অথর ইনফো + একশন বাটন */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow"
            />
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-gray-500">{post.date}</p>
            </div>
          </div>
          <div className="flex space-x-3 text-gray-500">
            <button className="hover:text-red-500 transition-colors">
              <FaHeart />
            </button>
            <button className="hover:text-yellow-500 transition-colors">
              <FaBookmark />
            </button>
            <button className="hover:text-blue-500 transition-colors">
              <FaShareAlt />
            </button>
          </div>
        </div>
      </div>

      {/* গ্লো ইফেক্ট (হোভারে দেখা যাবে) */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}