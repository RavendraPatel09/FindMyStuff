import React from 'react';
import { Target, Users, Shield, Zap } from 'lucide-react';

const SimpleAbout = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Post lost or found items in seconds with photos and smart categorization'
    },
    {
      icon: Target,
      title: 'Accurate Matching',
      description: 'Our smart algorithms help match lost items with found ones quickly'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by students, for students. Join thousands of users helping each other'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your privacy and safety are our top priority with secure messaging'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About FindMyStuff
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            The most advanced campus lost and found platform, powered by AI and built for the modern student community. 
            We're revolutionizing how students recover their belongings.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We believe that losing something shouldn't be a permanent loss. Our mission is to create 
                  the most effective, user-friendly platform for recovering lost items on campus.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  By leveraging modern technology and fostering community connections, we're making it 
                  easier than ever for students to reunite with their belongings.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl p-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">95%</div>
                  <div className="text-gray-700 dark:text-gray-300">Success Rate</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Items successfully returned to owners
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for Quick Recovery
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with intuitive design to help you recover lost items faster than ever.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Built by Students, for Students
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Our team understands the frustration of losing important items on campus because we've been there too. 
            That's why we created FindMyStuff - to turn the campus community into a powerful network for recovering lost belongings.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Community First</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We prioritize building a helpful, trustworthy community where students look out for each other.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Privacy Focused</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your personal information stays private. Connect safely without sharing sensitive details.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Always Improving</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We continuously enhance our platform based on user feedback and emerging technologies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimpleAbout;
