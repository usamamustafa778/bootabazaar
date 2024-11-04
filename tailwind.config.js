/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#294C35", // Green
        secondary: "#749455", // Light Green
        warmGray: "#585A6E",
        coolGray: "#474959",
        lightGreen: "#E5E8DE",
      },
      gridTemplateColumns: {
        navbar: "0.4fr 1fr",
        footer: "1fr 0.5fr 0.5fr",
        login: "1fr 400px",
        blog: "170px 1fr",
        blogList: "150px 1fr",
        home: "0.8fr 1fr",
        clone: "280px 1fr",
        accordian: "1fr 30px",
        inbox: "350px 1fr",
        articleEditor: "45vw 1fr",
        manageTemplate: "256px 1fr",
        templatePreview: "1fr 256px",
        fullPreview: "1fr 0",
        newSite: "0.4fr 1fr",
        profile: "300px 1fr",
        templateBox: "240px 1fr",
        articleCard: "240px 1fr",
        domainCard: "30vw 1fr 200px",
        categories: "60px 300px 150px 100px 125px",
        projectSeo: "1fr 200px",
        imageDetail: "70px 100px 100px 100px 200px 350px 600px",
      },
      boxShadow: {
        r: "80px 0 100px 40px #dfdfdf",
        l: "-80px 0 100px 40px #dfdfdf",
        selected: "0 3px 10px 7px #dfdfdf",
      },
      backgroundImage: {
        connect: "url(/img/connect.jpeg)",
        banner: "url(/img/banner.jpg)",
        banner1: "url(/public/img/banner1.jpg)",
        banner2: "url(/img/banner3.jpg)",
        login: "url(/img/login.jpg)",
        signup: "url(/img/signup.jpg)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
