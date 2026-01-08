 export const presets = {
    basic: ["style", "readability"],
    clean: ["style", "readability", "naming"],
    architecture: ["architecture", "naming"],
    bugs: ["bugs"],
    performance: ["performance"],
    security: ["security"],
  };

  export const options = [
    { id: "crit-style", value: "style", label: "Code Style" },
    { id: "crit-read", value: "readability", label: "Readability" },
    { id: "crit-naming", value: "naming", label: "Naming" },
    { id: "crit-arch", value: "architecture", label: "Architecture" },
    { id: "crit-bugs", value: "bugs", label: "Bug Detection" },
    { id: "crit-perf", value: "performance", label: "Performance" },
    { id: "crit-security", value: "security", label: "Security" },
  ];
