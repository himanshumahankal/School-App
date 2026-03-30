import { Head, Link } from '@inertiajs/react';
import { GraduationCap, Users, Award, BookOpen, Heart, Target, Eye } from 'lucide-react';

export default function About() {
  return (
    <>
      <Head title="About Us - V Y KOTHARI ENGLISH SCHOOL NERAL" />
      
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
                <Link href="/" className="text-gray-300 hover:text-indigo-400 transition">Home</Link>
                <Link href="/about" className="text-white hover:text-indigo-400 transition">About Us</Link>
                <Link href="/contact" className="text-gray-300 hover:text-indigo-400 transition">Contact Us</Link>
                <Link href="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <div className="pt-32 pb-20 bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Us</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our story, our mission, and our commitment to excellence in education.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                <p className="text-gray-300 mb-4">
                  Founded in 2005, V Y KOTHARI ENGLISH SCHOOL NERAL began with a simple yet powerful vision: to create an 
                  educational institution that would nurture not just academic excellence, but also character, 
                  creativity, and compassion in every student.
                </p>
                <p className="text-gray-300 mb-4">
                  What started as a small school with just 50 students and 10 teachers has grown into a 
                  thriving educational community of over 500 students and 50 dedicated educators. 
                  Our journey has been marked by continuous growth, innovation, and an unwavering 
                  commitment to our core values.
                </p>
                <p className="text-gray-300">
                  Over the years, we have produced generations of successful individuals who have gone on 
                  to make their mark in various fields - from medicine and engineering to arts and entrepreneurship.
                </p>
              </div>
              <div className="bg-gray-800 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-gray-700 rounded-xl">
                    <div className="text-4xl font-bold text-indigo-400 mb-2">20+</div>
                    <div className="text-gray-300">Years of Excellence</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-xl">
                    <div className="text-4xl font-bold text-green-400 mb-2">500+</div>
                    <div className="text-gray-300">Alumni</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-xl">
                    <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
                    <div className="text-gray-300">Expert Teachers</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-xl">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">95%</div>
                    <div className="text-gray-300">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-700 rounded-2xl p-8">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-300">
                  To provide a holistic education that empowers students to become confident, 
                  compassionate, and creative individuals prepared to face the challenges of a 
                  changing world. We are committed to fostering academic excellence while 
                  nurturing personal growth and social responsibility.
                </p>
              </div>
              <div className="bg-gray-700 rounded-2xl p-8">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-gray-300">
                  To be a leading educational institution that inspires and transforms lives 
                  through innovative teaching, ethical values, and a passion for lifelong learning. 
                  We envision creating global citizens who contribute positively to society and 
                  lead fulfilling lives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Values</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                These principles guide everything we do at V Y KOTHARI ENGLISH SCHOOL NERAL.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-indigo-600 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Excellence</h4>
                <p className="text-gray-400">Striving for the highest standards in everything we do.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Integrity</h4>
                <p className="text-gray-400">Acting with honesty, ethics, and transparency always.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Community</h4>
                <p className="text-gray-400">Building a supportive and inclusive school family.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-yellow-600 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Innovation</h4>
                <p className="text-gray-400">Embracing new ideas and creative thinking.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Leadership</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Meet the dedicated team of educators and administrators leading our school.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-700 rounded-2xl p-6 text-center">
                <div className="w-24 h-24 mx-auto bg-gray-600 rounded-full mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-1">Dr. Sarah Johnson</h4>
                <p className="text-indigo-400 mb-3">Principal</p>
                <p className="text-gray-400 text-sm">
                  Ph.D. in Education with 25 years of experience in academic leadership.
                </p>
              </div>
              <div className="bg-gray-700 rounded-2xl p-6 text-center">
                <div className="w-24 h-24 mx-auto bg-gray-600 rounded-full mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-1">Mr. David Williams</h4>
                <p className="text-green-400 mb-3">Vice Principal</p>
                <p className="text-gray-400 text-sm">
                  M.Sc. Mathematics with expertise in curriculum development.
                </p>
              </div>
              <div className="bg-gray-700 rounded-2xl p-6 text-center">
                <div className="w-24 h-24 mx-auto bg-gray-600 rounded-full mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-1">Ms. Emily Chen</h4>
                <p className="text-purple-400 mb-3">Academic Director</p>
                <p className="text-gray-400 text-sm">
                  Specialist in innovative teaching methodologies and student engagement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-indigo-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our School Community</h2>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
              Give your child the best start in life. Enroll them at V Y KOTHARI ENGLISH SCHOOL NERAL today.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact" className="px-8 py-3 bg-white text-indigo-700 rounded-lg hover:bg-gray-100 transition font-medium">
                Contact Us
              </Link>
              <Link href="/login" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-indigo-700 transition font-medium">
                Parent Login
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-8 w-8 text-indigo-500" />
                <span className="text-xl font-bold text-white">V Y KOTHARI ENGLISH SCHOOL NERAL</span>
              </div>
              <div className="flex items-center gap-6 text-gray-400">
                <Link href="/" className="hover:text-indigo-400 transition">Home</Link>
                <Link href="/about" className="hover:text-indigo-400 transition">About</Link>
                <Link href="/contact" className="hover:text-indigo-400 transition">Contact</Link>
                <Link href="/login" className="hover:text-indigo-400 transition">Login</Link>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
              <p>&copy; 2026 V Y KOTHARI ENGLISH SCHOOL NERAL. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
