const DropdownMenu = ({ section }) => {
  if (section === "New & Featured") {
    return (
      <div className="grid grid-cols-4 gap-8 w-full text-sm text-gray-800">
        {/* Column 1 */}
        <div>
          <h3 className="font-bold mb-3">Featured</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:underline">
                New & Upcoming Drops
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">New Arrivals</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Bestsellers</a>
            </li>
            <li>
              <a href="#" className="hover:underline">SNKRS Launch Calendar</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Customise with Nike By You</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Jordan</a>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-bold mb-3">Trending</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:underline">Summer Essentials</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Air Max Dn8</a>
            </li>
            <li>
              <a href="#" className="hover:underline">What's Trending</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Nike 24.7</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Colours of the Season: Pastel</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Retro Running</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Running Shoe Finder</a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-bold mb-3">Shop Icons</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:underline">Lifestyle</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Air Force 1</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Air Jordan 1</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Air Max</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Dunk</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Cortez</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Blazer</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Pegasus</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Vomero</a>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-bold mb-3">Shop By Sport</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:underline">Running</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Basketball</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Football</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Golf</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Tennis</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Gym and Training</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Yoga</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Skateboarding</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  //Men
  if (section === "Men" || section === "Women" || section === "Kids" || section === "Sale" || section === "SNKRS")  {
    return (
      <div className="grid grid-cols-5 gap-8 w-full text-sm text-gray-800">
        {/* Column 1 - Featured */}
        <div>
          <h3 className="font-bold mb-3">Featured</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">New Arrivals</a></li>
            <li><a href="#" className="hover:underline">Bestsellers</a></li>
            <li><a href="#" className="hover:underline">Shop All Sale</a></li>
          </ul>
        </div>

        {/* Column 2 - Shoes */}
        <div>
          <h3 className="font-bold mb-3">Shoes</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">All Shoes</a></li>
            <li><a href="#" className="hover:underline">Lifestyle</a></li>
            <li><a href="#" className="hover:underline">Jordan</a></li>
            <li><a href="#" className="hover:underline">Running</a></li>
            <li><a href="#" className="hover:underline">Football</a></li>
            <li><a href="#" className="hover:underline">Basketball</a></li>
            <li><a href="#" className="hover:underline">Gym and Training</a></li>
            <li><a href="#" className="hover:underline">Skateboarding</a></li>
            <li><a href="#" className="hover:underline">Sandals and Slides</a></li>
            <li><a href="#" className="hover:underline">Nike By You</a></li>
          </ul>
        </div>

        {/* Column 3 - Clothing */}
        <div>
          <h3 className="font-bold mb-3">Clothing</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">All Clothing</a></li>
            <li><a href="#" className="hover:underline">Tops and T-Shirts</a></li>
            <li><a href="#" className="hover:underline">Shorts</a></li>
            <li><a href="#" className="hover:underline">Pants and Leggings</a></li>
            <li><a href="#" className="hover:underline">Hoodies and Sweatshirts</a></li>
            <li><a href="#" className="hover:underline">Jackets and Gilets</a></li>
            <li><a href="#" className="hover:underline">Jerseys and Kits</a></li>
            <li><a href="#" className="hover:underline">Jordan</a></li>
          </ul>
        </div>

        {/* Column 4 - Shop By Sport */}
        <div>
          <h3 className="font-bold mb-3">Shop By Sport</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Running</a></li>
            <li><a href="#" className="hover:underline">Basketball</a></li>
            <li><a href="#" className="hover:underline">Football</a></li>
            <li><a href="#" className="hover:underline">Golf</a></li>
            <li><a href="#" className="hover:underline">Tennis</a></li>
            <li><a href="#" className="hover:underline">Gym and Training</a></li>
            <li><a href="#" className="hover:underline">Yoga</a></li>
            <li><a href="#" className="hover:underline">Skateboarding</a></li>
          </ul>
        </div>

        {/* Column 5 - Accessories and Equipment */}
        <div>
          <h3 className="font-bold mb-3">Accessories & Equipment</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">All Accessories</a></li>
            <li><a href="#" className="hover:underline">Bags and Backpacks</a></li>
            <li><a href="#" className="hover:underline">Socks</a></li>
            <li><a href="#" className="hover:underline">Hats and Headwear</a></li>
          </ul>
        </div>
      </div>
    );
  }
   
  

  return null;
};

export default DropdownMenu;




