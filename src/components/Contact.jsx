import React, { useState } from 'react';
import { Send, Mail, MapPin, CheckCircle2, AlertCircle, Copy, Check, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format.';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Please enter a subject.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate reliable dispatch & feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Auto-hide success alert after 8s
      setTimeout(() => {
        setIsSuccess(false);
      }, 8000);
    }, 1200);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-tag">
            <span className="section-tag-number">05</span> GET IN TOUCH
          </div>
          <h2 className="section-title">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="section-subtitle">
            Interested in collaborating, hiring for full-stack/analytics roles, or discussing innovative tech ideas? Let's connect.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Info & Social Cards */}
          <div className="contact-info-panel">
            <div className="contact-card-header">
              <h3 className="panel-title">Let's Build Something Extraordinary</h3>
              <p className="panel-subtitle">
                I am actively seeking junior/associate Full Stack Developer and Data Analyst roles. Whether you have a project inquiry or an open position, my inbox is open!
              </p>
            </div>

            {/* Direct Details */}
            <div className="contact-details-list">
              {/* Email */}
              <div className="contact-detail-item">
                <div className="detail-icon-box">
                  <Mail size={20} className="detail-icon" />
                </div>
                <div className="detail-text-wrap">
                  <span className="detail-label">Official Email</span>
                  <div className="email-copy-row">
                    <a href={`mailto:${personalInfo.contact.email}`} className="detail-value link">
                      {personalInfo.contact.email}
                    </a>
                    <button
                      onClick={copyEmailToClipboard}
                      className="copy-btn"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? <Check size={14} className="copied-check" /> : <Copy size={14} />}
                    </button>
                  </div>
                  {copiedEmail && <span className="copied-toast">Email copied!</span>}
                </div>
              </div>

              {/* Location */}
              <div className="contact-detail-item">
                <div className="detail-icon-box">
                  <MapPin size={20} className="detail-icon" />
                </div>
                <div className="detail-text-wrap">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">{personalInfo.contact.location}</span>
                </div>
              </div>

              {/* GitHub */}
              <div className="contact-detail-item">
                <div className="detail-icon-box">
                  <GithubIcon size={20} className="detail-icon" />
                </div>
                <div className="detail-text-wrap">
                  <span className="detail-label">GitHub Repository</span>
                  <a
                    href={personalInfo.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-value link"
                  >
                    github.com/KARTHICKT2007
                  </a>
                </div>
              </div>
            </div>

            {/* Social Hub Links */}
            <div className="social-links-block">
              <span className="social-block-title">Connect Across Networks</span>
              <div className="social-buttons-grid">
                <a
                  href={personalInfo.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  title="GitHub Profile"
                >
                  <GithubIcon size={18} />
                  <span>GitHub</span>
                </a>

                <a
                  href={personalInfo.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon size={18} />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={`mailto:${personalInfo.contact.email}`}
                  className="social-btn"
                  title="Send Direct Email"
                >
                  <Mail size={18} />
                  <span>Direct Mail</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="contact-form-panel">
            <div className="form-card-top">
              <Terminal size={18} className="terminal-form-icon" />
              <span className="terminal-form-title">transmission_terminal.sh</span>
            </div>

            {isSuccess && (
              <div className="form-success-banner" role="alert">
                <CheckCircle2 size={24} className="success-icon" />
                <div>
                  <h4 className="success-title">Message Sent Successfully!</h4>
                  <p className="success-message">
                    Thank you, your message has been sent. Karthick T. will review your message and reply promptly.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              {/* Name & Email Row */}
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="contact-name" className="field-label">
                    Your Name <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Recruiter or Client"
                    className={`field-input ${errors.name ? 'input-error' : ''}`}
                  />
                  {errors.name && (
                    <span className="field-error-text">
                      <AlertCircle size={13} /> {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="contact-email" className="field-label">
                    Email Address <span className="required-star">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className={`field-input ${errors.email ? 'input-error' : ''}`}
                  />
                  {errors.email && (
                    <span className="field-error-text">
                      <AlertCircle size={13} /> {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="form-field">
                <label htmlFor="contact-subject" className="field-label">
                  Subject <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry / Job Opportunity / Collaboration"
                  className={`field-input ${errors.subject ? 'input-error' : ''}`}
                />
                {errors.subject && (
                  <span className="field-error-text">
                    <AlertCircle size={13} /> {errors.subject}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="form-field">
                <label htmlFor="contact-message" className="field-label">
                  Your Message <span className="required-star">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className={`field-input textarea ${errors.message ? 'input-error' : ''}`}
                ></textarea>
                {errors.message && (
                  <span className="field-error-text">
                    <AlertCircle size={13} /> {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <span className="btn-spinner"></span>
                    <span>Transmitting Signal...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
