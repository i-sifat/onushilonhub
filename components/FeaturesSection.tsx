import { FileText, BarChart3, Search, BookOpen, TrendingUp, Smartphone } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      title: "Board Questions Database",
      description: "Access thousands of HSC and SSC board questions organized by year and board.",
      icon: FileText
    },
    {
      title: "Topic-wise Analysis",
      description: "Get detailed breakdowns of grammar topics with frequency analysis.",
      icon: BarChart3
    },
    {
      title: "Smart Filtering",
      description: "Filter questions by board, year, chapter, or difficulty level.",
      icon: Search
    },
    {
      title: "Grammar Rules",
      description: "Comprehensive grammar rules with examples and explanations.",
      icon: BookOpen
    },
    {
      title: "Progress Tracking",
      description: "Monitor your learning progress and identify weak areas.",
      icon: TrendingUp
    },
    {
      title: "Mobile Friendly",
      description: "Study anywhere, anytime with our responsive design.",
      icon: Smartphone
    }
  ];

  return (
    <section className="py-20 bg-sf-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sf-text-bold">
            Everything You Need to <span className="text-sf-button">Excel</span>
          </h2>
          <p className="text-xl text-sf-text-subtle max-w-2xl mx-auto">
            Comprehensive tools and resources designed specifically for HSC and SSC grammar preparation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-sf-bg border border-sf-text-muted/20 rounded-xl p-6 hover:border-sf-button/50 transition-all duration-300 hover:shadow-lg hover:shadow-sf-button/10"
            >
              <div className="mb-4">
                <feature.icon className="w-10 h-10 text-sf-button" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-sf-text-bold">{feature.title}</h3>
              <p className="text-sf-text-subtle">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}