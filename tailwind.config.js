/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'imgPage':"url('https://phongcachmoc.vn/upload/images/tin-tuc/20%20mau%20nha%20hang%20dep/update-07-2022/Sushi-World-Ton-That-Thiep-10.JPG')",
        'foodImg':"url('https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-variety-of-indian-food-in-front-of-a-dark-wooden-table-image_2930880.jpg')",
      }
    },
  },
  plugins: [],
};
