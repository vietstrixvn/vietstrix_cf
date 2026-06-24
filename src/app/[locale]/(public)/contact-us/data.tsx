import { ContactForm } from '@/components/forms/contact.form';
import { ContactHeroSetion } from '@/components/sections/hero-contact.section';
import React from 'react';

export default async function ContactPage() {
  return (
    <section>
      <ContactHeroSetion />
      <ContactForm />
    </section>
  );
}
