import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/ui/Logo';
import SearchBar from '../components/ui/SearchBar';
import FloatingActionButton from '../components/layout/FloatingActionButton';
import AccessibilityFeatures from '../components/features/AccessibilityFeatures';
import { Search, Users, Shield, Clock, Bell, MapPin, ArrowRight, Package, EyeOff, BookOpen, MessageSquare, Share2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import PageTransition from '../components/ui/PageTransition';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const { user } = useAuth();
  
  const [featuresRef, featuresInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const features = [
    {
      icon: Search,
      title: 'Smart Duplicate Detection',
      description: 'AI-powered system prevents duplicate posts and suggests similar items',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MessageSquare,
      title: 'Secure In-App Messaging',
      description: 'Chat safely without exposing personal contact information',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Share2,
      title: 'Social Media Integration',
      description: 'Share lost/found posts instantly across all social platforms',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: EyeOff,
      title: 'Anonymous Posting',
      description: 'Report sensitive items without revealing your identity',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Package,
      title: 'Batch Upload',
      description: 'Security staff can upload multiple items at once',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Shield,
      title: 'User Safety Features',
      description: 'Block and report problematic users to keep community safe',
      gradient: 'from-red-500 to-pink-500'
    }
  ];

  const stats = [
    { number: '500+', label: 'Items Recovered' },
    { number: '1200+', label: 'Active Users' },
    { number: '50+', label: 'Partner Colleges' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 py-16 min-h-screen flex items-start pt-20">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(14,165,233,0.1)_50%,transparent_75%)] bg-[length:60px_60px] animate-gradient"></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-bounce-gentle"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent dark:from-gray-800/30 dark:to-transparent"></div>
        </div>

        {/* Logo in top-left corner */}
        <motion.div 
          className="absolute top-6 left-6 z-10"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <Logo size="large" className="drop-shadow-2xl" />
        </motion.div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center text-center mt-8">
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Lost Something on
              <span className="block bg-gradient-to-r from-accent-300 to-primary-300 bg-clip-text text-transparent">
                Campus?
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl leading-relaxed text-gray-200 max-w-4xl mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your intelligent platform for finding lost items on campus. Connect with your community, 
              report lost belongings with AI-powered matching, and help others reunite with their possessions.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-6 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {user ? (
                <Link
                  to="/dashboard"
                  className="group relative px-10 py-5 text-xl font-bold text-white overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-2xl hover:shadow-glow-lg transform hover:scale-105"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center">
                    <Search className="w-6 h-6 mr-3" />
                    Browse Items
                  </span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="group relative px-10 py-5 text-xl font-bold text-white overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-2xl hover:shadow-glow-lg transform hover:scale-105"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative">Get Started Free</span>
                  </Link>
                  <Link
                    to="/login"
                    className="group px-10 py-5 text-xl font-bold text-white border-2 border-white/30 hover:border-white/60 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { number: '2,500+', label: 'Items Recovered', icon: '🎯' },
                { number: '5,000+', label: 'Happy Students', icon: '😊' },
                { number: '50+', label: 'Partner Colleges', icon: '🏫' },
                { number: '98%', label: 'Success Rate', icon: '⭐' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* Interactive Search Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Start Your Search
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Use our advanced AI-powered search to find your lost items quickly and efficiently
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <SearchBar 
              onSearch={(query, category) => console.log('Search:', query, category)}
              onFilterChange={(category) => console.log('Filter:', category)}
              showAdvanced={true}
              className="w-full max-w-4xl mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 dark:from-primary-900/10 dark:to-secondary-900/10"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold mb-4">
              Why Choose FindMyItem?
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Smart Features for
              <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Quick Recovery
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Our AI-powered platform revolutionizes how students find lost items on campus.
              Experience lightning-fast matching, secure communication, and verified user profiles.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Search,
                title: 'AI-Powered Search',
                description: 'Advanced machine learning algorithms match lost items with found reports instantly',
                color: 'from-blue-500 to-cyan-500',
                bgColor: 'bg-blue-50 dark:bg-blue-900/20'
              },
              {
                icon: Users,
                title: 'Verified Community',
                description: 'Connect with verified students through secure, college-authenticated profiles',
                color: 'from-purple-500 to-pink-500',
                bgColor: 'bg-purple-50 dark:bg-purple-900/20'
              },
              {
                icon: Shield,
                title: 'Privacy First',
                description: 'End-to-end encryption and privacy controls keep your information secure',
                color: 'from-green-500 to-emerald-500',
                bgColor: 'bg-green-50 dark:bg-green-900/20'
              },
              {
                icon: Clock,
                title: 'Real-Time Alerts',
                description: 'Instant notifications when someone finds an item matching your description',
                color: 'from-orange-500 to-red-500',
                bgColor: 'bg-orange-50 dark:bg-orange-900/20'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div 
                  key={index} 
                  className={`${feature.bgColor} p-8 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 group cursor-pointer`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Getting started is simple and takes just a few minutes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-600 dark:bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Create Account
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sign up with your college email to join your campus community
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 dark:bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Report Items
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Post lost or found items with photos and detailed descriptions
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 dark:bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Get Connected
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with item owners and arrange safe pickup locations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Powerful Features for Quick Recovery
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto">
              Discover the innovative features that make finding lost items easier than ever
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link to="/features" className="inline-flex items-center space-x-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-semibold">
              <span>Explore all features</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-sky-600 to-sky-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Stuff?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have successfully recovered their lost items
          </p>
          {!user && (
            <Link
              to="/signup"
              className="bg-white text-sky-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.05),transparent_50%)]"></div>
          <div className="container mx-auto px-4 relative">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold mb-4">
                Students Love FindMyItem
              </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Success Stories from
              <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Our Community
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join thousands of students who have successfully recovered their lost items
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                quote: "I lost my laptop charger in the computer lab. Within 2 hours of posting on FindMyItem, someone had found it and messaged me. The AI matching is incredible!",
                name: "Aarav Sharma",
                role: "Computer Science, 3rd Year",
                avatar: "AS",
                rating: 5,
                item: "💻 Laptop Charger"
              },
              {
                quote: "My grandmother's ring fell off during sports practice. I was devastated until FindMyItem's instant alerts helped me connect with the person who found it. Forever grateful!",
                name: "Priya Patel",
                role: "Business Administration, 2nd Year",
                avatar: "PP",
                rating: 5,
                item: "💍 Family Ring"
              },
              {
                quote: "As a campus security volunteer, I use FindMyItem to help students daily. The verification system and real-time notifications make reuniting items so much easier.",
                name: "Rohit Kumar",
                role: "Engineering, Final Year",
                avatar: "RK",
                rating: 5,
                item: "🛡️ Campus Helper"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-lg">⭐</span>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 px-3 py-1 rounded-full">
                    {testimonial.item}
                  </span>
                </div>
                
                <blockquote className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 group-hover:scale-110 transition-transform duration-300">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/testimonials"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-glow transform hover:scale-105"
            >
              Read More Success Stories
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New Sections: Know about FindMyItem, We Stand Out because, Our Key Focus Areas, What Makes Us Different */}
      <section className="bg-white dark:bg-gray-900 py-16 px-4 mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="rounded-xl shadow-lg p-8 border-t-4 border-blue-600 dark:border-blue-500 bg-white dark:bg-gray-900">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">Know about FindMyItem</h2>
            <p className="text-gray-700 dark:text-gray-300">FindMyItem is dedicated to helping students and staff recover lost belongings quickly and securely. Our mission is to create a trusted, community-driven platform for campus lost & found.</p>
          </div>
          <div className="rounded-xl shadow-lg p-8 border-t-4 border-pink-500 dark:border-pink-400 bg-white dark:bg-gray-900">
            <h2 className="text-xl font-bold text-pink-500 dark:text-pink-400 mb-4">We Stand Out because</h2>
            <ul className="list-disc ml-4 text-gray-700 dark:text-gray-300">
              <li>Verified campus accounts for safety</li>
              <li>Instant notifications for matches</li>
              <li>Smart search and easy reporting</li>
              <li>Supportive student community</li>
            </ul>
          </div>
          <div className="rounded-xl shadow-lg p-8 border-t-4 border-green-500 dark:border-green-400 bg-white dark:bg-gray-900">
            <h2 className="text-xl font-bold text-green-500 dark:text-green-400 mb-4">Our Key Focus Areas</h2>
            <ul className="list-disc ml-4 text-gray-700 dark:text-gray-300">
              <li>Lost & Found item recovery</li>
              <li>Campus safety and trust</li>
              <li>Fast, reliable communication</li>
              <li>Data privacy and protection</li>
            </ul>
          </div>
          <div className="rounded-xl shadow-lg p-8 border-t-4 border-yellow-400 dark:border-yellow-300 bg-white dark:bg-gray-900">
            <h2 className="text-xl font-bold text-yellow-500 dark:text-yellow-300 mb-4">What Makes Us Different</h2>
            <ul className="list-disc ml-4 text-gray-700 dark:text-gray-300">
              <li>Unique owner verification process</li>
              <li>Multi-campus support</li>
              <li>Mobile-first, modern design</li>
              <li>Dedicated support team</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo size="small" />
                <p className="text-gray-400 mt-4">
                  The fastest way to recover and report lost items on campus. Join your college community and never lose track again!
                </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Browse Items</Link></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Student-first lost & found for campuses.</li>
                <li>Post lost items or report found belongings in seconds.</li>
                <li>Smart search by category, location, and keywords.</li>
                <li>Owner verification and safe contact flow.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>Email: support@findmyitem.app</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Hours: Mon–Fri, 9AM–6PM</p>
                <p>Address: 123 Campus Way, Your City</p>
                <p>Twitter: @findmyitem • Instagram: @findmyitem</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-gray-400">
            <div className="flex items-center justify-between">
              <p className="text-sm">&copy; 2025 <span className="text-sky-400 font-semibold">FindMyItem</span>. All rights reserved.</p>
              <p className="text-sm">Created with <span className="text-pink-400">❤️</span> by Siddhi.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <FloatingActionButton 
        onAddItem={(type) => {
          console.log(`${type === 'lost' ? 'Report Lost Item' : 'Report Found Item'} clicked`);
          // Show notification for now
          const message = type === 'lost' ? 'Report Lost Item feature coming soon!' : 'Report Found Item feature coming soon!';
          
          // Create a simple notification
          const notification = document.createElement('div');
          notification.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white text-sm font-medium z-50 transition-all duration-300 bg-blue-500';
          notification.textContent = message;
          notification.style.opacity = '0';
          notification.style.transform = 'translateX(-50%) translateY(-20px)';
          
          document.body.appendChild(notification);
          
          setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(0)';
          }, 100);
          
          setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => {
              document.body.removeChild(notification);
            }, 300);
          }, 3000);
        }}
        onQuickSearch={() => {
          console.log('Quick search triggered');
          // Focus on the search bar
          const searchInput = document.querySelector('input[type="text"]');
          if (searchInput) {
            searchInput.focus();
            searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }}
      />

      {/* Settings with Language Options */}
      <AccessibilityFeatures />
    </div>
    </PageTransition>
  );
};

export default Home;
