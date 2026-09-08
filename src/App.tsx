import React, { useState, useEffect } from 'react';
import { 
  SERVICES_DATA, PROFESSIONALS_DATA, GALLERY_DATA, 
  TESTIMONIALS_DATA, BLOG_POSTS_DATA, INITIAL_APPOINTMENTS, 
  OWNER_INFO 
} from './data/mockData';
import { Service, Professional, GalleryItem, Testimonial, BlogPost, Appointment } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { ElydnaraAboutSection } from './components/ElydnaraAboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { PushNotificationBanner } from './components/PushNotificationBanner';

export default function App() {
  // Persistent or stateful collections
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('atelie_rosa_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('atelie_rosa_testimonials');
    return saved ? JSON.parse(saved) : TESTIMONIALS_DATA;
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('atelie_rosa_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('atelie_rosa_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);

  // Handlers
  const handleOpenBookingWithService = (serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleBookFromStyle = (styleName: string) => {
    // Select nail art or matching service
    const matchingService = SERVICES_DATA.find((s) => s.category === 'nailart' || s.category === 'alongamento');
    setPreselectedServiceId(matchingService?.id || SERVICES_DATA[0].id);
    setIsBookingOpen(true);
  };

  const handleAppointmentCreated = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
  };

  const handleUpdateAppointmentStatus = (id: string, newStatus: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  };

  const handleAddManualAppointment = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
  };

  const handleAddTestimonial = (newTestimonial: Testimonial) => {
    setTestimonials((prev) => [newTestimonial, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F9] text-[#2D2226] font-body flex flex-col selection:bg-[#E86A82] selection:text-white">
      {/* Top Push Notification Banner / Permissions */}
      <PushNotificationBanner />

      {/* Main Navigation Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBookingWithService()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section with cursive Elydnara floral branding */}
        <Hero onOpenBooking={() => handleOpenBookingWithService()} />

        {/* Services / Procedures Menu */}
        <ServicesSection
          services={SERVICES_DATA}
          onSelectService={(serviceId) => handleOpenBookingWithService(serviceId)}
        />

        {/* Real photo gallery of nail art & services */}
        <GallerySection
          galleryItems={GALLERY_DATA}
          onBookStyle={handleBookFromStyle}
        />

        {/* Elydnara - Business Owner & Master Nail Designer Story */}
        <ElydnaraAboutSection
          onOpenBooking={() => handleOpenBookingWithService()}
        />

        {/* Testimonials from real clients & Social media integration */}
        <TestimonialsSection
          testimonials={testimonials}
          onAddTestimonial={handleAddTestimonial}
        />

        {/* Blog with tips on nail care and nail polish trends */}
        <BlogSection
          posts={BLOG_POSTS_DATA}
          onOpenBooking={() => handleOpenBookingWithService()}
        />

        {/* Google Maps Location & Hours */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBookingWithService()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Booking Modal with Pre-payment & Automatic WhatsApp confirmation */}
      {isBookingOpen && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          services={SERVICES_DATA}
          professionals={PROFESSIONALS_DATA}
          existingAppointments={appointments}
          onAppointmentCreated={handleAppointmentCreated}
          initialServiceId={preselectedServiceId}
        />
      )}

      {/* Admin Panel for Elydnara to manage slots, appointments, and WhatsApp reminders */}
      {isAdminOpen && (
        <AdminPanelModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          appointments={appointments}
          services={SERVICES_DATA}
          professionals={PROFESSIONALS_DATA}
          onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
          onDeleteAppointment={handleDeleteAppointment}
          onAddAppointment={handleAddManualAppointment}
        />
      )}

      {/* Floating WhatsApp Widget */}
      <WhatsAppFloatingButton />
    </div>
  );
}
