
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Rajiv Sharma",
      position: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "Priya Patel",
      position: "Chief Operating Officer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "Amit Singh",
      position: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "Kavita Reddy",
      position: "Head of Customer Experience",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80"
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-black">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1612825173281-9a193378527e?auto=format&fit=crop&w=1920&q=80"
              alt="Luxury Cars Showroom"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="container mx-auto px-4 py-28 md:py-36 relative z-20">
            <div className="max-w-3xl animate-fade-in">
              <span className="inline-block text-gold mb-3 text-sm md:text-base tracking-wider font-medium">ABOUT LUXCARS</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                Setting The Standard In Luxury Automotive Excellence
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
                Founded in 2025, LuxCars has established itself as India's premier destination for luxury and performance automobiles. 
              </p>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20"></div>
        </div>
        
        {/* Story Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-gold font-medium">Our Story</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-6">A Passion For Automotive Excellence</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    LuxCars began with a simple vision: to create an exceptional automotive retail experience that matches the excellence of the vehicles we offer. What started as a boutique dealership has grown into India's most prestigious luxury car marketplace.
                  </p>
                  <p>
                    Our team of automotive enthusiasts, engineers, and luxury specialists work together to curate only the finest vehicles from prestigious brands worldwide. We personally inspect, verify, and authenticate each vehicle to ensure it meets our exacting standards.
                  </p>
                  <p>
                    Beyond selling exceptional automobiles, we foster a community of passionate collectors and enthusiasts who share our appreciation for automotive art, engineering, and heritage.
                  </p>
                </div>
                <div className="mt-8">
                  <Button asChild className="luxury-button">
                    <Link to="/contact">
                      Contact Us <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1549275301-9555373b9cc6?auto=format&fit=crop&w=600&q=80" 
                  alt="Luxury showroom" 
                  className="rounded-lg object-cover h-64 w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1616711242220-8a744288a609?auto=format&fit=crop&w=600&q=80" 
                  alt="Car detailing" 
                  className="rounded-lg object-cover h-64 w-full mt-8"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-gold font-medium">Our Values</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-4">What Drives Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our core values guide everything we do, from customer interactions to vehicle selection.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="luxury-card p-8 text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gold">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards in every aspect of our business, from vehicle selection to customer service.
                </p>
              </div>
              
              <div className="luxury-card p-8 text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gold">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Integrity</h3>
                <p className="text-muted-foreground">
                  We operate with complete transparency and honesty, ensuring our clients make informed decisions with confidence.
                </p>
              </div>
              
              <div className="luxury-card p-8 text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gold">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Passion</h3>
                <p className="text-muted-foreground">
                  Our genuine enthusiasm for automotive excellence drives us to deliver unforgettable experiences for our clients.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-gold font-medium">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-4">Meet The Experts</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our team of automotive specialists brings decades of combined experience and passion.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="luxury-card overflow-hidden group">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-serif font-medium text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
