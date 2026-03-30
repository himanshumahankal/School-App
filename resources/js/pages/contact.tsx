import { Head, Link } from '@inertiajs/react';
import { GraduationCap, Phone, Mail, MapPin, Clock, Send, MessageCircle, User, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <>
      <Head title="Contact Us - V Y KOTHARI ENGLISH SCHOOL NERAL" />
      
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
                <Link href="/about" className="text-gray-300 hover:text-indigo-400 transition">About Us</Link>
                <Link href="/contact" className="text-white hover:text-indigo-400 transition">Contact Us</Link>
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Reach out to us through any of the channels below.
            </p>
          </div>
        </div>

        {/* Contact Info Cards */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="bg-gray-800 rounded-2xl p-6 text-center hover:bg-gray-700 transition">
                <div className="w-16 h-16 mx-auto bg-indigo-600 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Our Location</h3>
                <p className="text-gray-400">123 Education Street</p>
                <p className="text-gray-400">City, State 12345</p>
              </div>
              <div className="bg-gray-800 rounded-2xl p-6 text-center hover:bg-gray-700 transition">
                <div className="w-16 h-16 mx-auto bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Phone Number</h3>
                <p className="text-gray-400">+1 234 567 8900</p>
                <p className="text-gray-400">+1 234 567 8901</p>
              </div>
              <div className="bg-gray-800 rounded-2xl p-6 text-center hover:bg-gray-700 transition">
                <div className="w-16 h-16 mx-auto bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Email Address</h3>
                <p className="text-gray-400">info@brightfureschool.com</p>
                <p className="text-gray-400">admissions@brightfureschool.com</p>
              </div>
              <div className="bg-gray-800 rounded-2xl p-6 text-center hover:bg-gray-700 transition">
                <div className="w-16 h-16 mx-auto bg-yellow-600 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Office Hours</h3>
                <p className="text-gray-400">Mon - Fri: 8:00 AM - 4:00 PM</p>
                <p className="text-gray-400">Sat: 9:00 AM - 1:00 PM</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-gray-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none"
                          placeholder="Admission Inquiry"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Message *</label>
                    <div className="relative">
                      <MessageCircle className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium flex items-center justify-center gap-2"
                  >
                    <Send className="h-5 w-5" />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Map & Additional Info */}
              <div className="space-y-8">
                <div className="bg-gray-800 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Quick Enquiry</h2>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      <strong className="text-indigo-400">Admissions:</strong> For admission-related queries, 
                      please contact our admissions office during business hours.
                    </p>
                    <p className="text-gray-300">
                      <strong className="text-green-400">Academic:</strong> For academic matters, 
                      reach out to the respective class teacher or academic coordinator.
                    </p>
                    <p className="text-gray-300">
                      <strong className="text-purple-400">General:</strong> For general inquiries, 
                      email us at info@brightfureschool.com.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Parent Portal Support</h2>
                  <p className="text-gray-300 mb-4">
                    Existing parents can access the parent portal for:
                  </p>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                      View attendance records
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Check exam results
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      Fee payment status
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      School announcements
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
                      <MessageCircle className="h-5 w-5" />
                      Access Parent Portal
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-indigo-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Visit Our Campus</h2>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
              Schedule a visit to experience our campus, meet our faculty, and learn more about our programs.
            </p>
            <Link href="/contact" className="inline-block px-8 py-3 bg-white text-indigo-700 rounded-lg hover:bg-gray-100 transition font-medium">
              Schedule a Visit
            </Link>
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
