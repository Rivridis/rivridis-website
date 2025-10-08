import Link from 'next/link';


export default function Footer() {
    return (
        <footer id = "foot" className="bg-[#5C7694] text-zinc-900 text-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
      {/* Company Info */}
      <div>
        <h3 className="text-zinc-900 text-lg font-semibold mb-4">Rivridis</h3>
        <p className="text-zinc-800">
          Building quality digital experiences for businesses and individuals.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-zinc-900 font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li><a href="/" className="hover:text-zinc-500">Home</a></li>
          <li><a href="/windows-assistant" className="hover:text-zinc-500">Rivridis Assistant</a></li>
          <li><a href="/services" className="hover:text-zinc-500">Services</a></li>
          <li><a href="/contact" className="hover:text-zinc-500">Contact</a></li>
        </ul>
      </div>

      {/* Resources */}
      <div>
        <h4 className="text-zinc-900 font-semibold mb-4">Resources</h4>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-zinc-500">Blog</a></li>
          <li><a href="/stories" className="hover:text-zinc-500">Stories</a></li>
          <li><a href="#" className="hover:text-zinc-500">Music</a></li>
      
        </ul>
      </div>

      {/* Legal */}
      <div>
        <h4 className="text-zinc-900 font-semibold mb-4">Legal</h4>
        <ul className="space-y-2">
          <li><a href="privacy-policy" className="hover:text-zinc-500">Privacy Policy</a></li>
          <li><a href="/terms" className="hover:text-zinc-500">Terms of Service</a></li>
        </ul>
      </div>

      {/* Newsletter or Social */}
      <div>
        <h4 className="text-zinc-900 font-semibold mb-4">Follow Us</h4>
        <div className="flex space-x-4">
          <a href="https://www.instagram.com/rivridis/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-500">
            <i className="fab fa-facebook"></i> Instagram
          </a>
          <a href="https://github.com/Rivridis/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-500">
            <i className="fab fa-github"></i> Github
          </a>
        </div>
      </div>
    </div>

    {/* Bottom Footer */}
    <div className="border-t border-gray-700 mt-10 pt-6 text-center">
      &copy; {new Date().getFullYear()} Rivridis. All rights reserved.
    </div>
  </div>
</footer>
    )
}
