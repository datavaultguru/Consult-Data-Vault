import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, BarChart3, PieChart, LineChart, Database, Zap, FileSpreadsheet, Settings } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { db } from "@/src/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    businessType: "",
    problem: "",
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        status: "new",
        createdAt: new Date().toISOString(),
      });
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", businessType: "", problem: "" });
    } catch (error) {
      console.error("Error submitting lead:", error);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-24 pb-32 lg:pt-36 lg:pb-40">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/dashboard/1920/1080?blur=10')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950 to-slate-950"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Turn Your Business Data Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Clear, Profitable Decisions</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg leading-8 text-slate-300 sm:text-xl max-w-2xl mx-auto"
            >
              I help businesses unlock hidden insights using Data Analytics, Power BI dashboards, and automated reporting.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 h-14 text-lg rounded-full" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Book Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white font-semibold px-8 h-14 text-lg rounded-full" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
                View Portfolio
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Credibility Section */}
      <section className="py-16 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500 mb-8">Trusted Technologies</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {['Excel', 'Power BI', 'SQL', 'Python', 'Automation'].map((tech) => (
              <div key={tech} className="flex items-center gap-2 text-xl font-bold text-slate-300">
                <Database className="h-6 w-6 text-indigo-500" />
                {tech}
              </div>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {[
              { label: 'Dashboards Built', value: '50+' },
              { label: 'Data Projects Completed', value: '120+' },
              { label: 'Businesses Helped', value: '40+' },
              { label: 'Reports Automated', value: '200+' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <dt className="text-base leading-7 text-slate-400">{stat.label}</dt>
                <dd className="text-4xl font-bold tracking-tight text-white mt-2">{stat.value}</dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Expert Data Services</h2>
            <p className="mt-4 text-lg text-slate-400">Transforming raw data into actionable business intelligence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Power BI Dashboard Development', icon: <PieChart className="h-8 w-8 text-indigo-400" />, desc: 'Interactive, real-time dashboards that provide a 360-degree view of your business.', benefit: 'Make faster, data-driven decisions.' },
              { title: 'Excel Automation', icon: <FileSpreadsheet className="h-8 w-8 text-emerald-400" />, desc: 'Automate repetitive Excel tasks, macros, and complex spreadsheet models.', benefit: 'Save hours of manual work every week.' },
              { title: 'Data Cleaning & Transformation', icon: <Database className="h-8 w-8 text-cyan-400" />, desc: 'Cleanse, structure, and prepare messy data for accurate analysis.', benefit: 'Ensure your insights are based on reliable data.' },
              { title: 'Business Intelligence Consulting', icon: <BarChart3 className="h-8 w-8 text-purple-400" />, desc: 'Strategic guidance on implementing data culture and BI tools in your organization.', benefit: 'Align data strategy with business goals.' },
              { title: 'Reporting Automation', icon: <Zap className="h-8 w-8 text-yellow-400" />, desc: 'Set up automated pipelines to deliver reports directly to your inbox.', benefit: 'Never miss a critical business update.' },
              { title: 'KPI Dashboard Development', icon: <LineChart className="h-8 w-8 text-rose-400" />, desc: 'Track your most important metrics with custom Key Performance Indicator dashboards.', benefit: 'Monitor business health at a glance.' },
            ].map((service, i) => (
              <Card key={i} className="bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 transition-colors group">
                <CardHeader>
                  <div className="mb-4 p-3 bg-slate-800/50 rounded-lg w-fit group-hover:bg-indigo-500/10 transition-colors">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 mb-4">{service.desc}</p>
                  <div className="flex items-start gap-2 text-sm text-slate-300 font-medium">
                    <CheckCircle2 className="h-5 w-5 text-indigo-500 shrink-0" />
                    <span>{service.benefit}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 text-indigo-400 group-hover:text-indigo-300" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                    Discuss this service <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Featured Case Studies</h2>
            <p className="mt-4 text-lg text-slate-400">Real-world examples of how data transformed these businesses.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Sales Performance Dashboard',
                problem: 'Client had no visibility into regional sales performance and was losing market share.',
                solution: 'Built an automated Power BI dashboard integrating CRM and ERP data.',
                impact: '+22% increase in Q3 sales due to targeted regional interventions.',
                img: 'https://picsum.photos/seed/sales/800/600?blur=2'
              },
              {
                title: 'Financial Analytics Dashboard',
                problem: 'Monthly financial reporting took 40 hours of manual Excel work.',
                solution: 'Automated data pipelines and created a real-time financial health dashboard.',
                impact: 'Reduced reporting time to 2 hours/month, saving $15k annually.',
                img: 'https://picsum.photos/seed/finance/800/600?blur=2'
              },
              {
                title: 'Marketing Campaign Analytics',
                problem: 'Marketing spend was inefficient due to lack of attribution tracking.',
                solution: 'Implemented a multi-touch attribution model and marketing ROI dashboard.',
                impact: 'Improved ROAS by 35% within the first two months of implementation.',
                img: 'https://picsum.photos/seed/marketing/800/600?blur=2'
              },
              {
                title: 'Operational KPI Dashboard',
                problem: 'Manufacturing bottlenecks were causing frequent delivery delays.',
                solution: 'Developed a real-time operational tracking system using SQL and Power BI.',
                impact: 'Decreased average delivery time by 4 days, improving customer satisfaction.',
                img: 'https://picsum.photos/seed/operations/800/600?blur=2'
              },
              {
                title: 'Inventory Analytics Dashboard',
                problem: 'High holding costs and frequent stockouts were hurting profitability.',
                solution: 'Created an inventory forecasting model and automated alert system.',
                impact: 'Reduced stockouts by 80% and lowered holding costs by 15%.',
                img: 'https://picsum.photos/seed/inventory/800/600?blur=2'
              },
              {
                title: 'Customer Churn Predictor',
                problem: 'SaaS client was losing 5% of customers monthly without knowing why.',
                solution: 'Built a predictive model to identify at-risk customers based on usage patterns.',
                impact: 'Reduced churn to 2% by enabling proactive customer success interventions.',
                img: 'https://picsum.photos/seed/churn/800/600?blur=2'
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 shadow-xl"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-80"></div>
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  
                  {/* Hover Content */}
                  <div className="h-0 overflow-hidden opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 ease-in-out">
                    <div className="space-y-3 mt-4 text-sm">
                      <div>
                        <span className="text-indigo-400 font-semibold block">The Problem:</span>
                        <span className="text-slate-300">{item.problem}</span>
                      </div>
                      <div>
                        <span className="text-emerald-400 font-semibold block">The Solution:</span>
                        <span className="text-slate-300">{item.solution}</span>
                      </div>
                      <div>
                        <span className="text-cyan-400 font-semibold block">Business Impact:</span>
                        <span className="text-white font-medium">{item.impact}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm font-medium text-indigo-400 group-hover:hidden">
                    View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-slate-400">A proven 5-step process to turn your data into profit.</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-800 hidden md:block"></div>
            <div className="space-y-12">
              {[
                { step: '01', title: 'Understand Your Business', desc: 'We start with a deep dive into your business goals, challenges, and current data landscape.' },
                { step: '02', title: 'Analyze Your Data', desc: 'I audit your existing data sources, identifying gaps, quality issues, and opportunities.' },
                { step: '03', title: 'Build Custom Dashboards', desc: 'Developing tailored, interactive dashboards in Power BI or Excel that answer your specific questions.' },
                { step: '04', title: 'Deliver Actionable Insights', desc: 'Translating complex data into clear, easy-to-understand reports that highlight what needs attention.' },
                { step: '05', title: 'Help You Scale Using Data', desc: 'Providing ongoing support and strategy to ensure your business continues to grow data-driven.' },
              ].map((item, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2 p-4 md:p-8">
                    <div className={`flex flex-col ${i % 2 === 0 ? 'md:items-start' : 'md:items-end text-right'}`}>
                      <span className="text-5xl font-black text-slate-800 mb-2">{item.step}</span>
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-indigo-600 border-4 border-slate-900 items-center justify-center z-10">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-20 blur-2xl rounded-full"></div>
                <img 
                  src="https://picsum.photos/seed/consultant/800/800" 
                  alt="Data Analytics Consultant" 
                  className="relative rounded-2xl shadow-2xl border border-slate-800 object-cover aspect-square"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">About The Consultant</h2>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                I'm a Data Analytics & Business Intelligence Consultant dedicated to helping small and medium businesses make smarter, more profitable decisions using their own data.
              </p>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Too often, valuable business insights are buried in messy spreadsheets or disconnected systems. My mission is to uncover those insights, build automated reporting systems, and give you the clarity you need to scale your business confidently.
              </p>
              
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Core Expertise</h3>
                <div className="flex flex-wrap gap-3">
                  {['Power BI', 'Excel', 'SQL', 'Python', 'Data Visualization', 'Business Analytics'].map((skill) => (
                    <span key={skill} className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white h-12 px-8 rounded-full" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Let's Talk Data
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Consulting Packages</h2>
            <p className="mt-4 text-lg text-slate-400">Transparent pricing for data solutions that deliver ROI.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <Card className="bg-slate-900/50 border-slate-800 flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">Starter Analytics</CardTitle>
                <CardDescription>Perfect for small businesses starting with data.</CardDescription>
                <div className="mt-4 text-3xl font-bold text-white">$300 - $500</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm text-slate-300">
                  {['Basic dashboard', 'Data cleaning', 'Excel or Power BI report', '1 data source', '1 revision', 'Delivery in 3–5 days'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-indigo-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Get Started</Button>
              </CardFooter>
            </Card>

            {/* Growth (Recommended) */}
            <Card className="bg-gradient-to-b from-indigo-900/40 to-slate-900/80 border-2 border-indigo-500 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-indigo-500/20 z-10">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-500/30">
                Recommended
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-white">Business Growth</CardTitle>
                <CardDescription className="text-indigo-200/70">Comprehensive analytics for growing companies.</CardDescription>
                <div className="mt-4 text-3xl font-bold text-white">$900 - $1500</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm text-slate-200">
                  {['Multiple dashboards', 'Data automation', 'KPI tracking system', 'Business insights report', 'Data visualization optimization', '3 revisions', 'Delivery in 7–10 days'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Get Started</Button>
              </CardFooter>
            </Card>

            {/* Enterprise */}
            <Card className="bg-slate-900/50 border-slate-800 flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">Business Intelligence</CardTitle>
                <CardDescription>Full-scale data systems for established businesses.</CardDescription>
                <div className="mt-4 text-3xl font-bold text-white">$2000 - $3000+</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm text-slate-300">
                  {['Complete analytics system', 'Data integration', 'Automated reporting pipeline', 'Executive dashboards', 'Business insights consulting', 'Performance tracking dashboards', '30-day support'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-indigo-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Get Started</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Lead Generation Section */}
      <section id="contact" className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 to-transparent blur-3xl rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Book a Free Data Consultation</h2>
              <p className="text-slate-400">Tell me about your business and the data challenges you're facing. I'll get back to you within 24 hours.</p>
            </div>

            {submitSuccess ? (
              <div className="bg-emerald-950/30 border border-emerald-800 rounded-xl p-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Request Received!</h3>
                <p className="text-slate-300">Thank you for reaching out. I'll be in touch shortly to schedule our consultation.</p>
                <Button className="mt-6 bg-slate-800 hover:bg-slate-700 text-white" onClick={() => setSubmitSuccess(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-300">Name</label>
                    <Input 
                      id="name" 
                      required 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      placeholder="john@company.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="businessType" className="text-sm font-medium text-slate-300">Business Type / Industry</label>
                  <Input 
                    id="businessType" 
                    required 
                    placeholder="e.g. E-commerce, Healthcare, Agency" 
                    value={formData.businessType}
                    onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="problem" className="text-sm font-medium text-slate-300">Current Data Problem</label>
                  <Textarea 
                    id="problem" 
                    required 
                    placeholder="Describe what you're struggling with (e.g., messy Excel files, need a sales dashboard...)" 
                    className="min-h-[120px]"
                    value={formData.problem}
                    onChange={(e) => setFormData({...formData, problem: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 text-lg font-semibold" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Schedule Consultation"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
