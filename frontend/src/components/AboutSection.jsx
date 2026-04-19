import React from 'react';
import translations from '../utils/translations';
import { motion } from 'framer-motion';
import { FileText, BarChart2, BookOpen, Link, Cpu } from 'lucide-react';

const AboutSection = () => {
  const t = translations['English'];
  const facilities = [
    {
      icon: <FileText className="text-lex-gold" />,
      title: t.aiCaseSummarizationTitle || 'AI Case Summarization',
      description: t.aiCaseSummarizationDesc || 'Instantly transform lengthy legal documents into concise, actionable summaries without losing critical details.'
    },
    {
      icon: <BarChart2 className="text-lex-gold" />,
      title: t.predictiveOutcomesTitle || 'Predictive Outcomes',
      description: t.predictiveOutcomesDesc || 'Utilize advanced machine learning to estimate win/loss probabilities based on historical case patterns.'
    },
    {
      icon: <BookOpen className="text-lex-gold" />,
      title: t.provisionIdentificationTitle || 'Provision Identification',
      description: t.provisionIdentificationDesc || 'Automatically identify and link relevant acts, sections, and legal provisions mentioned in your documents.'
    },
    {
      icon: <Cpu className="text-lex-gold" />,
      title: t.precedentSearchTitle || 'Precedent Search',
      description: t.precedentSearchDesc || 'Find comparable past judgments and legal precedents within seconds using our semantic search engine.'
    },
    {
      icon: <Link className="text-lex-gold" />,
      title: t.smartUrlIntegrationTitle || 'Smart URL Integration',
      description: t.smartUrlIntegrationDesc || 'Process not just uploaded files, but also direct links to legal repositories and online case documents.'
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            {t.capabilitiesOfLexAI || 'Capabilities of'} <span className="lex-gradient-text">LexAI</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            {t.capabilitiesDescription || 'Our AI-driven research engine is designed specifically for the Indian Commercial Court system, providing judges and legal professionals with state-of-the-art facilities.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-morphism p-8 rounded-2xl hover:border-lex-gold/30 transition-all group"
            >
              <div className="bg-lex-gold/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {facility.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{facility.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {facility.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
