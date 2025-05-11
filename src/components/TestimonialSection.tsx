
export function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      quote: "LuxCars provided me with an exceptional buying experience. Their selection of luxury vehicles is unmatched, and the customer service exceeded all expectations.",
      author: "Raj Patel",
      position: "CEO, Patel Industries",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    },
    {
      id: 2,
      quote: "I've been a collector of fine automobiles for decades, and LuxCars is where I found my dream vehicle. Their attention to detail and product knowledge is truly impressive.",
      author: "Priya Sharma",
      position: "Art Director",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    },
    {
      id: 3,
      quote: "The selection process was smooth and professional, and the after-sales service has been impeccable. LuxCars truly understands what luxury means.",
      author: "Vikram Singh",
      position: "Entrepreneur",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">What Our Clients Say</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Discover why discerning enthusiasts and collectors choose LuxCars for their premium automotive needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="luxury-card p-6 flex flex-col">
              <div className="mb-6">
                <svg className="h-8 w-8 text-gold" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1.646 13.825 2.228 20.606c3.505-2.755 9.275-4.126 11.308-4.126 1.998 0 3.138 1.156 3.138 3.04c0 2.21-2.076 3.477-4.782 3.477-3.253 0-6.533-2.089-6.533-7.292C5.36 10.6 9.039 5.68 14.959 3.76 15 3.748 9.352 4 9.352 4zm18.35 0c-4.895 3.456-7.706 9.825-7.124 16.606c3.505-2.755 9.275-4.126 11.308-4.126c1.998 0 3.138 1.156 3.138 3.04c0 2.21-2.076 3.477-4.782 3.477c-3.253 0-6.533-2.089-6.533-7.292c0-5.105 3.68-10.024 9.6-11.944C27.35 3.748 27.7 4 27.7 4z" />
                </svg>
              </div>
              <blockquote className="flex-1 mb-4">
                <p className="text-lg italic">{testimonial.quote}</p>
              </blockquote>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
