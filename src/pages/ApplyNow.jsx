// src/pages/ApplyNow.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Upload, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Building2,
  Users,
  Star,
  Globe,
  Send,
  Eye,
  Calendar,
  Award,
  Heart,
  Shield,
  Sparkles,
  Zap,
  Target,
  UserCheck,
  MessageSquare,
  TrendingUp,
  Briefcase as BriefcaseIcon,
  GraduationCap,
  Coffee
} from 'lucide-react';

const ApplyNow = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    position: '',
    experience: '',
    resume: null,
    coverLetter: '',
    portfolio: '',
    agreeTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiResponse, setApiResponse] = useState(null);

  const jobPositions = [
    'Administrative Assistant',
    'Receptionist',
    'Executive Assistant',
    'Office Manager',
    'Data Entry Clerk',
    'Customer Service Representative',
    'HR Coordinator',
    'Office Administrator'
  ];

  const experienceLevels = [
    'Entry Level (0-2 years)',
    'Mid Level (3-5 years)',
    'Senior Level (6-10 years)',
    'Executive (10+ years)'
  ];

  const benefits = [
    { icon: <Award className="w-4 h-4" />, text: 'Competitive Salary' },
    { icon: <Heart className="w-4 h-4" />, text: 'Health Benefits' },
    { icon: <Clock className="w-4 h-4" />, text: 'Flexible Hours' },
    { icon: <Target className="w-4 h-4" />, text: 'Career Growth' },
    { icon: <Zap className="w-4 h-4" />, text: 'Work-Life Balance' },
    { icon: <Sparkles className="w-4 h-4" />, text: 'Professional Development' }
  ];

  const stats = [
    { icon: <Users className="w-5 h-5" />, label: 'Open Positions', value: '2,500+' },
    { icon: <Building2 className="w-5 h-5" />, label: 'Hiring Companies', value: '500+' },
    { icon: <Clock className="w-5 h-5" />, label: 'Quick Apply', value: '5 min' },
    { icon: <Star className="w-5 h-5" />, label: 'Success Rate', value: '92%' },
  ];

  const tips = [
    { icon: <CheckCircle className="w-4 h-4" />, title: 'Tailor Your Resume', description: 'Customize your resume for each position' },
    { icon: <FileText className="w-4 h-4" />, title: 'Write a Great Cover Letter', description: 'Show your personality and why you\'re a fit' },
    { icon: <Eye className="w-4 h-4" />, title: 'Proofread Everything', description: 'Check for spelling and grammar errors' },
    { icon: <UserCheck className="w-4 h-4" />, title: 'Update Your Profile', description: 'Keep your professional profiles updated' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resume: 'File size should be less than 5MB' }));
        return;
      }
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, resume: 'Please upload PDF or Word document' }));
        return;
      }
      setFormData(prev => ({ ...prev, resume: file }));
      setErrors(prev => ({ ...prev, resume: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.position) newErrors.position = 'Please select a position';
    if (!formData.resume) newErrors.resume = 'Please upload your resume';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // API Configuration - Fixed for Vite
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const API_ENDPOINTS = {
    apply: `${API_BASE_URL}/applications`,
    upload: `${API_BASE_URL}/upload`,
    status: `${API_BASE_URL}/applications/status`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setApiResponse(null);

    try {
      // Prepare form data for API
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('coverLetter', formData.coverLetter);
      formDataToSend.append('portfolio', formData.portfolio);
      formDataToSend.append('resume', formData.resume);

      // API Call
      const response = await fetch(API_ENDPOINTS.apply, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setApiResponse({ type: 'success', message: data.message || 'Application submitted successfully!' });
        
        // Reset form after success
        setTimeout(() => {
          setShowSuccess(false);
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            location: '',
            position: '',
            experience: '',
            resume: null,
            coverLetter: '',
            portfolio: '',
            agreeTerms: false
          });
          setApiResponse(null);
        }, 4000);
      } else {
        setApiResponse({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      console.error('Application submission error:', error);
      setApiResponse({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950">
      {/* Hero Section with Navy & Yellow Theme */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-navy-900 via-navy-800 to-navy-950 py-20 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-6 py-2 bg-yellow-400/20 backdrop-blur-sm rounded-full border border-yellow-400/30"
          >
            <span className="text-sm font-semibold tracking-wider text-yellow-300">🚀 YOUR CAREER STARTS HERE</span>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Apply Now
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Take the next step in your career. Apply for office and administrative positions across Canada.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            <span className="px-4 py-2 bg-navy-800/50 backdrop-blur-sm rounded-full text-sm flex items-center gap-2 text-yellow-300 border border-yellow-400/20">
              <TrendingUp className="w-4 h-4 text-yellow-400" /> 2,500+ Open Positions
            </span>
            <span className="px-4 py-2 bg-navy-800/50 backdrop-blur-sm rounded-full text-sm flex items-center gap-2 text-yellow-300 border border-yellow-400/20">
              <Coffee className="w-4 h-4 text-yellow-400" /> Apply in 5 Minutes
            </span>
          </motion.div>
        </div>
        {/* Animated Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path fill="#1a1a2e" fillOpacity="1" d="M0,64L80,58.7C160,53,320,43,480,42.7C640,43,800,53,960,58.7C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </motion.div>

      {/* Stats Bar with Navy & Yellow Theme */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12 relative z-10"
      >
        <div className="bg-navy-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 border border-yellow-400/20">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="flex items-center gap-4 group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center text-navy-900 shadow-lg group-hover:shadow-yellow-400/30 transition-all duration-300">
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-yellow-300">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <motion.div variants={itemVariants} className="bg-navy-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-yellow-400/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-navy-900" />
                </div>
                <h2 className="text-2xl font-bold text-white">Application Form</h2>
              </div>
              
              {/* Success Message - Enhanced */}
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-400/30 rounded-xl flex items-start gap-3"
                >
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-300">🎉 Application Submitted!</h3>
                    <p className="text-green-200/70 text-sm">Your application has been sent successfully. We'll contact you soon.</p>
                  </div>
                </motion.div>
              )}

              {/* API Error Message - Enhanced */}
              {apiResponse && apiResponse.type === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-gradient-to-r from-red-900/50 to-rose-900/50 border border-red-400/30 rounded-xl flex items-start gap-3"
                >
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-300">Submission Failed</h3>
                    <p className="text-red-200/70 text-sm">{apiResponse.message}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-yellow-300 mb-1">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400 group-focus-within:text-yellow-300 transition-colors" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${errors.fullName ? 'border-red-500 ring-2 ring-red-500/30' : 'border-navy-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30'} rounded-xl focus:outline-none transition-all duration-200 bg-navy-900/50 text-white placeholder-gray-400`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-yellow-300 mb-1">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400 group-focus-within:text-yellow-300 transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500 ring-2 ring-red-500/30' : 'border-navy-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30'} rounded-xl focus:outline-none transition-all duration-200 bg-navy-900/50 text-white placeholder-gray-400`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-yellow-300 mb-1">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <div className="relative group">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400 group-focus-within:text-yellow-300 transition-colors" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${errors.phone ? 'border-red-500 ring-2 ring-red-500/30' : 'border-navy-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30'} rounded-xl focus:outline-none transition-all duration-200 bg-navy-900/50 text-white placeholder-gray-400`}
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-yellow-300 mb-1">
                      Location
                    </label>
                    <div className="relative group">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400 group-focus-within:text-yellow-300 transition-colors" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-navy-600 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 bg-navy-900/50 text-white placeholder-gray-400"
                        placeholder="Toronto, ON"
                      />
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-yellow-300 mb-1">
                      Position Applying For <span className="text-red-400">*</span>
                    </label>
                    <div className="relative group">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400 group-focus-within:text-yellow-300 transition-colors" />
                      <select
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${errors.position ? 'border-red-500 ring-2 ring-red-500/30' : 'border-navy-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30'} rounded-xl focus:outline-none transition-all duration-200 appearance-none bg-navy-900/50 text-white`}
                      >
                        <option value="" className="bg-navy-900">Select a position</option>
                        {jobPositions.map((job) => (
                          <option key={job} value={job} className="bg-navy-900">{job}</option>
                        ))}
                      </select>
                    </div>
                    {errors.position && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.position}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-yellow-300 mb-1">
                      Experience Level
                    </label>
                    <div className="relative group">
                      <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400 group-focus-within:text-yellow-300 transition-colors" />
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-navy-600 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 appearance-none bg-navy-900/50 text-white"
                      >
                        <option value="" className="bg-navy-900">Select experience level</option>
                        {experienceLevels.map((level) => (
                          <option key={level} value={level} className="bg-navy-900">{level}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Resume Upload - Enhanced */}
                <div>
                  <label className="block text-sm font-medium text-yellow-300 mb-1">
                    Resume <span className="text-red-400">*</span>
                  </label>
                  <div className={`relative border-2 border-dashed ${errors.resume ? 'border-red-500 ring-2 ring-red-500/30' : 'border-yellow-400/40 hover:border-yellow-400'} rounded-xl p-6 transition-all duration-200 bg-navy-900/50 hover:bg-navy-900/70`}>
                    <input
                      type="file"
                      name="resume"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-center">
                      <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-yellow-400/20">
                        <Upload className="w-6 h-6 text-navy-900" />
                      </div>
                      <p className="text-gray-300">
                        {formData.resume ? (
                          <span className="text-yellow-400 font-medium">{formData.resume.name}</span>
                        ) : (
                          <>
                            <span className="font-semibold text-yellow-400">Click to upload</span> or drag and drop
                          </>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                    </div>
                  </div>
                  {errors.resume && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.resume}
                    </p>
                  )}
                  {formData.resume && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-400 bg-green-900/30 p-2 rounded-lg border border-green-400/20">
                      <CheckCircle className="w-4 h-4" />
                      <span>File uploaded successfully</span>
                    </div>
                  )}
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-medium text-yellow-300 mb-1">
                    Cover Letter
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-navy-600 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 bg-navy-900/50 text-white placeholder-gray-400"
                    placeholder="Tell us why you're the perfect candidate for this role..."
                  ></textarea>
                </div>

                {/* Portfolio */}
                <div>
                  <label className="block text-sm font-medium text-yellow-300 mb-1">
                    Portfolio / Website
                  </label>
                  <div className="relative group">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400 group-focus-within:text-yellow-300 transition-colors" />
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-navy-600 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 bg-navy-900/50 text-white placeholder-gray-400"
                      placeholder="https://your-portfolio.com"
                    />
                  </div>
                </div>

                {/* Terms and Submit */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-navy-900/50 rounded-xl border border-yellow-400/20">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 text-yellow-400 border-navy-600 rounded focus:ring-yellow-400 bg-navy-900"
                    />
                    <label className="text-sm text-gray-300">
                      I agree to the{' '}
                      <a href="#" className="text-yellow-400 hover:underline font-medium">Terms and Conditions</a>
                      {' '}and confirm that the information provided is accurate.
                    </label>
                  </div>
                  {errors.agreeTerms && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.agreeTerms}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-semibold text-navy-900 flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
                      isSubmitting 
                        ? 'bg-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:shadow-2xl hover:shadow-yellow-400/30 hover:from-yellow-300 hover:to-yellow-400'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-navy-900 border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Application
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Quick Tips - Enhanced */}
            <motion.div variants={itemVariants} className="bg-navy-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-yellow-400/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Quick Tips
              </h3>
              <ul className="space-y-4">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 bg-navy-700 rounded-lg flex items-center justify-center text-yellow-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                      {tip.icon}
                    </div>
                    <div>
                      <p className="font-medium text-white">{tip.title}</p>
                      <p className="text-sm text-gray-400">{tip.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Benefits - Enhanced */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 rounded-2xl shadow-2xl p-6 text-white relative overflow-hidden border border-yellow-400/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Why Join Us?
                </h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3 bg-navy-800/50 backdrop-blur-sm rounded-lg p-2 hover:bg-navy-700/50 transition-all border border-yellow-400/10">
                      <div className="w-7 h-7 bg-yellow-400/10 rounded-lg flex items-center justify-center text-yellow-400">
                        {benefit.icon}
                      </div>
                      <span className="text-sm text-gray-200">{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Need Help - Enhanced */}
            <motion.div variants={itemVariants} className="bg-navy-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-yellow-400/20">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-yellow-400" />
                Need Help?
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Having trouble with your application? We're here to help!
              </p>
              <button className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-navy-900 rounded-xl font-medium hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-200 flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Contact Support
              </button>
            </motion.div>

            {/* Trust Badge - Enhanced */}
            <motion.div variants={itemVariants} className="bg-navy-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-2 border-yellow-400/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 border border-yellow-400/30">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-white">🔒 Secure Application</p>
                  <p className="text-sm text-gray-400">Your data is encrypted and secure</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ApplyNow;