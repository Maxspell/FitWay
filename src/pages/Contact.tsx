import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="section-title text-center mb-12">Get in Touch</h1>
        
        <div className="grid grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1B2B3B] text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-[#1B2B3B] text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1B2B3B] text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-[#1B2B3B] text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <Send className="h-5 w-5" />
                Send Message
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-[#1B2B3B] p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-[#FF8C00]" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-300">(603) 842-342</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-[#1B2B3B] p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-[#FF8C00]" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-300">info@6fit.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-[#1B2B3B] p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-[#FF8C00]" />
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-300">123 Fitness Street<br />New York, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-[#1B2B3B] p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-[#FF8C00]" />
                  </div>
                  <div>
                    <p className="font-medium">Working Hours</p>
                    <p className="text-gray-300">Mon - Fri: 6:00 AM - 10:00 PM<br />Sat - Sun: 8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">What are your membership options?</h3>
                  <p className="text-gray-300">We offer flexible membership plans including monthly, quarterly, and annual options. Contact us for detailed pricing.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Do you offer personal training?</h3>
                  <p className="text-gray-300">Yes, we have certified personal trainers available for one-on-one sessions and small group training.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;