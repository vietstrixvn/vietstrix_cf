'use client';

import { Button } from '@/components/ui/button';
import { CreateContactDTO, CreateContactSchema } from '@/types/portfolio';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Facebook, Github, Linkedin, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, Input, Label, Textarea } from '../ui';
import { Container } from '../wrappers/container';
import { SectionTag } from '../customs/section-tag.custom';
import { logError } from '@/utils';
import { useCreateContact } from '@/hooks/contact/useContact';
import ReCAPTCHA from 'react-google-recaptcha';

export interface CreateContactItem {
  name: string;
  email: string;
  phone_number: string;
  message: string;
  service?: string;
}

export function Monitor() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[600px]"
    >
      <rect
        x="100"
        y="50"
        width="600"
        height="400"
        rx="20"
        fill="#0A2756"
        stroke="#000"
        strokeWidth="4"
      />
      <rect x="120" y="70" width="560" height="360" rx="10" fill="#fff" />
      <path
        d="M300 450L250 550H550L500 450H300Z"
        fill="#0A2756"
        stroke="#000"
        strokeWidth="4"
      />
      <rect
        x="200"
        y="550"
        width="400"
        height="20"
        rx="10"
        fill="#0A2756"
        stroke="#000"
        strokeWidth="4"
      />
    </svg>
  );
}

export function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isLoading] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const form = useForm<Omit<CreateContactDTO, 'captcha_token'>>({
    resolver: zodResolver(CreateContactSchema.omit({ captcha_token: true })),
    defaultValues: {
      full_name: '',
      email: '',
      phone_number: '',
      message: '',
    },
  });

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const addContactMutation = useCreateContact();

  const onSubmit = async (data: Omit<CreateContactDTO, 'captcha_token'>) => {
    try {
      const recaptchaToken = recaptchaRef.current?.getValue();

      // Nếu chưa tích captcha thì chặn lại và thông báo
      if (!recaptchaToken) {
        toast.error('Please check the box "I am not a robot"!');
        return;
      }

      const submitData: CreateContactDTO = {
        ...data,
        captcha_token: recaptchaToken,
      };

      if (!submitData.post_id) {
        delete submitData.post_id;
      }

      const result = await addContactMutation.mutateAsync(submitData);

      if (result) {
        window.gtag?.('event', 'generate_lead');
      }

      form.reset();
      recaptchaRef.current?.reset();
    } catch (error: any) {
      logError('Error creating contact:', error);
      toast.error(error.message || 'Lỗi khi gửi thông tin liên hệ');
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[600px] min-h-[600px]"
    >
      <AnimatePresence>
        {!isInView && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <Monitor />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: -100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Card className="w-full">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-4">
                  <Image
                    src="/icons/logo-cricle.svg"
                    alt="Logo"
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <h2 className="text-xl font-semibold text-main">Vietstrix</h2>
                </div>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                  ref={formRef}
                >
                  {(
                    ['full_name', 'email', 'phone_number', 'message'] as const
                  ).map((field, index) => (
                    <motion.div
                      key={field}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="space-y-2"
                    >
                      <Label htmlFor={field}>
                        {field.replace('_', ' ').toUpperCase()} *
                      </Label>
                      {field === 'message' ? (
                        <Textarea
                          id="message"
                          placeholder="Message"
                          {...form.register('message')}
                          required
                          className="min-h-[100px] border-muted-foreground/25 transition-all duration-200 focus:scale-[1.02]"
                        />
                      ) : (
                        <Input
                          id={field}
                          type={field === 'email' ? 'email' : 'text'}
                          {...form.register(field)}
                          required
                          className="border-muted-foreground/25 transition-all duration-200 focus:scale-[1.02]"
                        />
                      )}
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }} // Cho mượt theo sequence animation của bạn
                    className="flex justify-center py-2"
                  >
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center justify-between"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#0A2756] hover:bg-[#0A2756]/90"
                      >
                        {isLoading ? 'Sending...' : 'SEND A MESSAGE'}
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation for letter-by-letter text reveal
  const headingText = "Need Any help? We're Here For You.";
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.03,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };
  const t = useTranslations('Page');

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 bg-white md:py-24 relative overflow-hidden"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <Container>
        <motion.div
          className="flex flex-col lg:flex-row gap-12 lg:gap-16 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left side - Business information */}
          <div className="lg:w-1/2 space-y-8">
            <motion.div
              className="flex items-center text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SectionTag title={t('Contact.title')} />
            </motion.div>

            <h2 className="text-3xl md:text-5xl lg:text-4xl font-bold text-main leading-tight">
              {headingText.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="inline-block"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </h2>

            <motion.div
              className="space-y-6 text-slate-700"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="space-y-1">
                <h3 className="font-semibold uppercase text-sm tracking-wider">
                  Location:
                </h3>
                <p className="text-lg">Ho Chi Minh City, VietNam</p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-slate-600">Email:</p>
                  <a
                    href="mailto:contact@vietstrix.com"
                    className="text-primary text-lg hover-underline-animation"
                  >
                    contact@vietstrix.com
                  </a>
                </div>

                <div>
                  <p className="text-slate-600">Phone Number:</p>
                  <a
                    href="tel:+84377783437"
                    className="text-primary text-lg hover-underline-animation"
                  >
                    +84 377 783 437
                  </a>
                </div>
                <div>
                  <p className="text-slate-600">Social Medias</p>
                  <div className="flex space-x-2 mt-4">
                    <motion.a
                      href="https://www.facebook.com/vietstrix"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md bg-muted p-2 text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com/company/vietstrix"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md bg-muted p-2 text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </motion.a>
                    <motion.a
                      href="https://github.com/vietstrixvn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md bg-muted p-2 text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </motion.a>
                    <motion.a
                      href="mailto:contact@vietstrix.com"
                      className="rounded-md bg-muted p-2 text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right side - Contact form */}

          <Contact />
        </motion.div>
      </Container>
    </section>
  );
}
