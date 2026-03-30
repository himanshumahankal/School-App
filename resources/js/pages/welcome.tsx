import { Head, Link } from '@inertiajs/react';
import { GraduationCap, Users, BookOpen, Award, Calendar, Phone, Mail, MapPin } from 'lucide-react';

export default function Welcome() {
  return (
    <>
      <Head title="Home - V Y KOTHARI ENGLISH SCHOOL NERAL" />
      
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-8 w-8 text-indigo-500" />
                <span className="text-xl font-bold">V Y KOTHARI ENGLISH SCHOOL NERAL</span>
              </div>
              <div className="hidden md:flex items-center gap-8">
                <Link href="/" className="text-white hover:text-indigo-400 transition">Home</Link>
                <Link href="/about" className="text-gray-300 hover:text-indigo-400 transition">About Us</Link>
                <Link href="/contact" className="text-gray-300 hover:text-indigo-400 transition">Contact Us</Link>
                <Link href="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen">
          <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)' }}>
            <span className="absolute inset-0 bg-gray-900/80"></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl md:text-6xl leading-tight mb-6">
                    Shaping Tomorrow's Leaders Today
                  </h1>
                  <p className="mt-4 text-lg text-gray-300 mb-8">
                    At V Y KOTHARI ENGLISH SCHOOL NERAL, we nurture young minds with excellence in education, 
                    character building, and holistic development. Join us in creating a brighter tomorrow.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Link href="/about" className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
                      Learn More
                    </Link>
                    <Link href="/contact" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition font-medium">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Us?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We provide a comprehensive educational experience that prepares students for the challenges of tomorrow.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-700 rounded-xl p-6 text-center hover:transform hover:scale-105 transition">
                <div className="w-16 h-16 mx-auto bg-indigo-600 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Expert Faculty</h3>
                <p className="text-gray-400">Experienced and dedicated teachers committed to student success.</p>
              </div>
              <div className="bg-gray-700 rounded-xl p-6 text-center hover:transform hover:scale-105 transition">
                <div className="w-16 h-16 mx-auto bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Academic Excellence</h3>
                <p className="text-gray-400">Consistently high results in board examinations and competitions.</p>
              </div>
              <div className="bg-gray-700 rounded-xl p-6 text-center hover:transform hover:scale-105 transition">
                <div className="w-16 h-16 mx-auto bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Small Class Sizes</h3>
                <p className="text-gray-400">Personalized attention with optimal student-teacher ratio.</p>
              </div>
              <div className="bg-gray-700 rounded-xl p-6 text-center hover:transform hover:scale-105 transition">
                <div className="w-16 h-16 mx-auto bg-yellow-600 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Modern Facilities</h3>
                <p className="text-gray-400">State-of-the-art labs, library, sports complex, and more.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-indigo-700">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
                <div className="text-indigo-200">Students</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
                <div className="text-indigo-200">Teachers</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">20+</div>
                <div className="text-indigo-200">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">95%</div>
                <div className="text-indigo-200">Pass Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Join Our Community?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Give your child the gift of quality education. Contact us today to learn about our admissions process.
            </p>
            <Link href="/contact" className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
              Get in Touch
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="h-8 w-8 text-indigo-500" />
                  <span className="text-xl font-bold text-white">V Y KOTHARI ENGLISH SCHOOL NERAL</span>
                </div>
                <p className="text-gray-400">
                  Empowering students with knowledge, skills, and values for a brighter tomorrow.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/" className="hover:text-indigo-400 transition">Home</Link></li>
                  <li><Link href="/about" className="hover:text-indigo-400 transition">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-indigo-400 transition">Contact Us</Link></li>
                  <li><Link href="/login" className="hover:text-indigo-400 transition">Login</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Contact Info</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>123 Education Street, City, State 12345</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>+1 234 567 8900</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>info@brightfureschool.com</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
              <p>&copy; 2026 V Y KOTHARI ENGLISH SCHOOL NERAL. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
