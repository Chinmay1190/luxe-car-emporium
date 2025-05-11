
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MapPin, Phone, Mail } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Your message has been sent! We'll get back to you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Contact Us</h1>
            <p className="text-muted-foreground max-w-3xl">
              Have questions about our vehicles or services? We're here to help. Reach out to our team for personalized assistance.
            </p>
          </div>
        </div>
        
        {/* Contact Info and Form */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-serif font-bold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">
                      378 Luxury Lane, South Delhi<br/>
                      New Delhi, 110001
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Call Us</h3>
                    <p className="text-muted-foreground">
                      +91 98765 43210<br/>
                      Monday-Saturday, 10am-8pm
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email Us</h3>
                    <p className="text-muted-foreground">
                      info@luxcars.com<br/>
                      sales@luxcars.com
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="font-medium mb-3">Business Hours</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Monday-Friday</span>
                    <span>10:00 AM - 8:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="luxury-card p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject of your inquiry"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        rows={6}
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Button
                        type="submit"
                        className="luxury-button w-full py-6"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending Message..." : "Send Message"}
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        We'll respond to your inquiry within 24 hours.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="h-96 bg-card border-t border-border relative">
          {/* This would be a Google Maps iframe in a real application */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-gold mb-4 mx-auto" />
              <h3 className="font-serif text-xl font-medium">LuxCars Showroom</h3>
              <p className="text-muted-foreground">
                378 Luxury Lane, South Delhi, New Delhi, 110001
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
