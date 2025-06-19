import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Egg } from 'lucide-react';

const Footer: React.FC = () => {
  const footerStyle = {
    background: 'linear-gradient(135deg, var(--neutral-800), var(--neutral-900))',
    color: 'white',
    padding: '60px 0 20px',
    marginTop: '80px',
  };

  return (
    <footer style={footerStyle}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}>
          {/* Brand Section */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}>
              <div style={{
                background: 'linear-gradient(135deg, var(--primary-color), var(--primary-light))',
                borderRadius: '12px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Egg size={24} color="white" />
              </div>
              <span style={{
                fontSize: '24px',
                fontWeight: '700',
                color: 'white',
              }}>
                NutriEggs
              </span>
            </div>
            <p style={{
              color: 'var(--neutral-300)',
              lineHeight: '1.6',
              marginBottom: '20px',
            }}>
              Premium egg white products crafted for health-conscious individuals. 
              Pure protein, minimal calories, maximum nutrition.
            </p>
            <div style={{
              display: 'flex',
              gap: '15px',
            }}>
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary-color)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '20px',
              color: 'white',
            }}>
              Quick Links
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Products' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
                { to: '/faq', label: 'FAQ' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    color: 'var(--neutral-300)',
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--primary-light)';
                    e.currentTarget.style.paddingLeft = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--neutral-300)';
                    e.currentTarget.style.paddingLeft = '0';
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '20px',
              color: 'white',
            }}>
              Contact Info
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'var(--neutral-300)',
              }}>
                <MapPin size={18} color="var(--primary-light)" />
                <span>123 Health Street, Nutrition City, NC 12345</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'var(--neutral-300)',
              }}>
                <Phone size={18} color="var(--primary-light)" />
                <span>(555) 123-4567</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'var(--neutral-300)',
              }}>
                <Mail size={18} color="var(--primary-light)" />
                <span>info@nutrieggs.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '20px',
              color: 'white',
            }}>
              Newsletter
            </h3>
            <p style={{
              color: 'var(--neutral-300)',
              marginBottom: '20px',
              lineHeight: '1.6',
            }}>
              Subscribe to get special offers, free recipes, and health tips.
            </p>
            <div style={{
              display: 'flex',
              gap: '10px',
            }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '14px',
                }}
              />
              <button
                style={{
                  padding: '12px 20px',
                  background: 'linear-gradient(135deg, var(--primary-color), var(--primary-light))',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <p style={{
            color: 'var(--neutral-400)',
            fontSize: '14px',
          }}>
            © 2024 NutriEggs. All rights reserved.
          </p>
          <div style={{
            display: 'flex',
            gap: '30px',
          }}>
            <a href="#" style={{
              color: 'var(--neutral-400)',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'color 0.3s ease',
            }}>
              Privacy Policy
            </a>
            <a href="#" style={{
              color: 'var(--neutral-400)',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'color 0.3s ease',
            }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;