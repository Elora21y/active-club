const SectionTitle = ({ title }) => {
  return (
    <div className="relative text-center mb-14">
      <h2 className="text-[72px] md:text-[90px]  font-bold uppercase opacity-15">
        {title.toUpperCase()}
      </h2>
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl md:text-4xl font-extrabold text-neutral">
        {title}
      </p>
    </div>
  );
};

export default SectionTitle;
