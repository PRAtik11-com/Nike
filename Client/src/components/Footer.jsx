// components/Footer.jsx
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-6 mt-8 text-sm text-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h4 className="font-bold mb-2">Resources</h4>
          <ul>
            <li>Find A Store</li>
            <li>Become A Member</li>
            <li>Send Us Feedback</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Help</h4>
          <ul>
            <li>Order Status</li>
            <li>Delivery</li>
            <li>Payment Options</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Company</h4>
          <ul>
            <li>About Nike</li>
            <li>News</li>
            <li>Careers</li>
          </ul>
        </div>
      </div>
      <p className="text-center mt-4">&copy; 2025 Nike, Inc. All rights reserved.</p>
    </footer>
  )
}

export default Footer
