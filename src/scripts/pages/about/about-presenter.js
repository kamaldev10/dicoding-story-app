// about-presenter.js
class AboutPresenter {
  constructor(view) {
    this.view = view;
    this.data = {
      name: "Ali Musthafa Kamal",
      role: "Front End Designer",
      tagline:
        "Creating intuitive digital experiences that solve real-world problems.",
      bio: "I am a passionate developer with 5+ years of experience creating user-centered digital solutions. My journey in technology started when I built my first website at age 15, and I've been hooked ever since. I specialize in creating intuitive, accessible, and responsive web applications that solve real problems for real people.",
      skills: [
        { title: "Front-end", description: "React, Vue, Angular" },
        { title: "Back-end", description: "Node.js, Python, PHP" },
        { title: "Database", description: "MongoDB, MySQL, Firebase" },
        { title: "Design", description: "Figma, Adobe XD" },
      ],
    };
  }

  async loadStory() {
    // Simulasi pemuatan data, bisa diisi dengan pemanggilan API jika diperlukan
    this.view.render(this.data); // Render data ke tampilan
  }
}

export default AboutPresenter;
