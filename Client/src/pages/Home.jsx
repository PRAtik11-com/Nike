// HomePage.jsx
import React from "react";
import ShopByIconsSlider from "./ShopByIconsSlider";
import TrendingNowSlider from "./TrendingNowSlider";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header Announcement */}
      <div className="text-center py-4 border-b border-gray-200">
        <h2 className="text-sm md:text-base font-medium text-gray-800">
          New Styles On Sale: Up To 40% Off
        </h2>
        <a
          href="#"
          className="text-blue-600 font-semibold text-sm hover:underline"
        >
          Shop All Our New Markdowns
        </a>
      </div>

      {/* Hero Banner */}
      <div className="w-full">
        {/* <img
          src="/assets/banner.jpg" // replace with actual path
          alt="TRIOMPHE PSG Banner"
          className="w-full h-auto object-cover"
        /> */}
        <img
          data-qa="image-media-img"
          alt="Nike. Just Do It"
          src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_2078,c_limit/df780016-65a2-4a34-9aa1-53bdbf58bdc4/nike-just-do-it.png"
          data-landscape-url="https://static.nike.com/a/images/f_auto,cs_srgb/w_1920,c_limit/df780016-65a2-4a34-9aa1-53bdbf58bdc4/nike-just-do-it.png"
          data-portrait-url="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/e71a09d2-057a-4a1a-93ae-4fd0152d7d4e/nike-just-do-it.png"
          data-image-loaded-class="guL_1FMX"
        ></img>
      </div>

      {/* TRIOMPHE Section */}
      <div className="text-center py-12 px-4">
        <h3 className="text-lg font-medium text-gray-800">
          Paris Saint-Germain
        </h3>
        <h1 className="text-5xl md:text-6xl font-extrabold mt-2 text-black">
          TRIOMPHE
        </h1>
        <p className="text-gray-600 text-base mt-4">
          Celebrate the win in style.
        </p>
        <button className="mt-6 px-6 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition">
          Shop
        </button>
      </div>

      {/* 3-Image Grid Section */}
      <div className="max-w-7xl mx-auto px-2 py-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Featured</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="text-center">
            <a href="#" className="block relative">
              <img
                data-qa="image-media-img"
                alt="Nike. Just Do It"
                src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_534,c_limit/cd6c60f4-1fd9-4c90-90af-77d846e7f1cd/image.png"
                data-landscape-url="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/cd6c60f4-1fd9-4c90-90af-77d846e7f1cd/image.png"
                data-portrait-url="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/721506e5-473d-40c7-bf7c-e7280871794d/nike-just-do-it.png"
                data-image-loaded-class="guL_1FMX"
              />
              <p className="mt-4 text-base font-medium text-gray-800">
                Your One And Only Layer
              </p>
            </a>
          </div>

          {/* Card 2 */}
          <div className="text-center">
            <a href="#" className="block relative">
              <img
                data-qa="image-media-img"
                alt="Nike. Just Do It"
                src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_534,c_limit/3262facc-2b47-4cb6-b5cf-b3023af00aa2/image.png"
                data-landscape-url="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/3262facc-2b47-4cb6-b5cf-b3023af00aa2/image.png"
                data-portrait-url="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/0b48ae59-e694-4fa6-8f52-0ae546161e80/nike-just-do-it.png"
                data-image-loaded-class="guL_1FMX"
              />
              <p className="mt-4 text-base font-medium text-gray-800">
                Nike Killshot
              </p>
            </a>
          </div>

          {/* Card 3 */}
          <div className="text-center">
            <a href="#" className="block relative">
              <img
                data-qa="image-media-img"
                alt="Nike. Just Do It"
                src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_534,c_limit/b35e1943-2c57-46c7-b28e-2882658eef70/nike-just-do-it.png"
                data-landscape-url="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/b35e1943-2c57-46c7-b28e-2882658eef70/nike-just-do-it.png"
                data-portrait-url="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/9ff303d3-1b04-4dac-bfe8-cca7dc3799b9/image.png"
                data-image-loaded-class="guL_1FMX"
              />
              <p className="mt-4 text-base font-medium text-gray-800">
                Nike Sonic Fly
              </p>
            </a>
          </div>
        </div>
      </div>

      {/* 3-Image Grid Section for Trending */}
      <div className="max-w-7xl mx-auto px-2 py-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Trending</h1>
        <div className="text-center">
          <a href="#" className="block relative">
            <img
              data-qa="image-media-img"
              alt="Nike. Just Do It"
              src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_1721,c_limit/56fe1abe-b1e9-4936-b5de-f9906fb609c5/nike-just-do-it.jpg"
              className="w-full h-[480px] "
            />
          </a>
        </div>
        {/*  Elevate Your Look Section */}
        <div className="text-center py-12 px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mt-2 text-black">
            Elevate Your Look
          </h1>
          <p className="text-black text-base mt-4">
            Be ready for anything with the season's newest styles.
          </p>
          <button className="mt-6 px-6 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition">
            Shop Sandals
          </button>
        </div>
      </div>

      {/* Two-Column Section After Trending */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left Side Image (50% View) */}
          <div className="w-full lg:w-1/2 overflow-hidden  shadow-lg">
            <img
              src="https://static.nike.com/a/images/f_auto,cs_srgb/w_1920,c_limit/fc7d12c6-45eb-425b-abe9-3abce2d1c414/image.png"
              alt="Nike Left Side"
              className="w-[200%] h-[420px] object-left object-cover "
            />
          </div>

          {/* Right Side Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Summer Essentials
            </h2>
            <p className="mt-4 text-gray-700 text-base">
              Gear up for sunny days with breathable fabrics and laid-back fits.
            </p>
            <button className="mt-6 px-6 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition">
              Shop Collection
            </button>
          </div>
        </div>
        {/*  Elevate Your Look Section */}
        <div className="text-center py-12 px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mt-2 text-black">
            FLY VINI
          </h1>
          <p className="text-black text-base mt-4">
            Welcome aboard supersonic speed in the first Vini Jr. Mercurial
            Vapor.
          </p>
          <button className="mt-6 px-6 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition">
            Shop Mercurial
          </button>
        </div>
      </div>

      {/* ShopByIconsimage-slider */}
      <ShopByIconsSlider />

      <div className="max-w-7xl mx-auto px-4 py-12">
         <h1 className="text-4xl font-bold text-gray-900 mb-8">Don't miss</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Luka 77 Space Navigator */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_965,c_limit/12b179b2-0f10-402f-8cf5-86d5578f124d/nike-just-do-it.png" 
              alt="Luka.77 'Space Navigator'"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h3 className="text-2xl font-bold text-white">
                Luka.77 'Space Navigator'
              </h3>
              <button className="mt-4 px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition">
                Shop
              </button>
            </div>
          </div>

          {/* Air Jordan 1 Ruby */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_965,c_limit/47cff6ba-a8db-4b6d-b661-a59035bbd120/nike-just-do-it.png" 
              alt="Air Jordan 1 'Ruby'"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h3 className="text-2xl font-bold text-white">
                Air Jordan 1 'Ruby'
              </h3>
              <button className="mt-4 px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition">
                Shop
              </button>
            </div>
          </div>
        </div>
      </div>
       <TrendingNowSlider />


    </div>
  );
};

export default Home;
