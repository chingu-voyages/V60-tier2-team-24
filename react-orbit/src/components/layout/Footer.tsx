const teamMembers = [
  {
    name: "Shivani Bhardwaj",
    github: "https://github.com/shivanibhardwaj0911",
  },
  { name: "Jose Cruz", github: "https://github.com/Cruz3196" },
  { name: "Ruth Igwe-Oruta", github: "https://github.com/Xondacc" },
  { name: "Sasikumar", github: "https://github.com/vel-sk98" },
  { name: "Pooja Balachandran", github: "https://github.com/PCoderHub" },
  { name: "Eduard", github: "https://github.com/EduardDE7" },
  { name: "Anderson Osayerie", github: "https://github.com/andemosa" },
];

export const Footer = () => {
  return (
    <div>
      <footer className="bg-[#f8fafc] text-center p-4">
        <h1 className="text-lg font-semibold font-manrope text-[#1E40AF] mb-2">
          Orbit
        </h1>
        <a
          href="https://github.com/chingu-voyages/V60-tier2-team-24"
          className="text-md  hover:text-[#1E40AF] mb-4"
        >
          View Team Github repository
        </a>
        <div className="mt-1 flex flex-col items-center">
          <span className="mb-2 text-[10px] font-medium uppercase tracking-[1px] text-[#cbd5e1]">
            Team Members:
          </span>
          <div className="max-h-28 overflow-y-auto scrollbar-hide">
            {teamMembers.map((member, index) => (
              <a
                key={index}
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block font-medium text-[#94a3b8] hover:text-[#1e40af]"
              >
                {member.name}
              </a>
            ))}
          </div>
        </div>
        <p className="text-[#424654] pt-1">
          © {new Date().getFullYear()} Orbit. All rights reserved.
        </p>
        <p className="text-[#424654] pt-1">
          © {new Date().getFullYear()} Orbit. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
