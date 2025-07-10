import React from 'react';
import AirPollutionExtras from '../../components/AirPollutionExtras';

const articles = [
  {
    title: 'What is Air Pollution?',
    summary: 'Air pollution is the presence of substances in the air that are harmful to humans and the environment. It can come from vehicles, factories, wildfires, and even natural sources like dust storms.',
    link: 'https://www.who.int/health-topics/air-pollution',
  },
  {
    title: 'How Does Air Quality Affect Health?',
    summary: 'Poor air quality can cause respiratory problems, heart disease, and even impact mental health. Children, the elderly, and those with pre-existing conditions are most at risk.',
    link: 'https://www.epa.gov/air-pollution-transportation/health-effects-air-pollution',
  },
  {
    title: 'Simple Ways to Reduce Air Pollution',
    summary: 'Use public transport, plant trees, avoid burning trash, and support clean energy. Small actions by many people can make a big difference!',
    link: 'https://www.unep.org/news-and-stories/story/10-ways-you-can-fight-air-pollution',
  },
];

const Home = () => {
  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 to-green-50 py-4 md:py-8 px-2 flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-xl p-0 flex flex-col md:flex-row items-center md:gap-8 gap-0 mb-10 overflow-hidden">
        <img
          src="/pollution.png"
          alt="Clean air and city skyline"
          className="w-full md:w-64 h-48 md:h-64 object-cover md:rounded-xl md:shadow-lg md:border md:border-gray-200 rounded-t-2xl rounded-b-none border-b border-gray-200 md:mb-0 mb-0"
        />
        <div className="flex-1 w-full p-6 md:p-8 md:bg-white/90 md:rounded-xl md:shadow-xl">
          <h1 className="text-4xl sm:text-3xl font-bold text-gray-500 mb-4">Welcome to InstantAQI</h1>
          <p className="text-lg text-gray-700 mb-2">Your one-stop platform for real-time air quality insights and health tips.</p>
          <div className="bg-blue-100 text-blue-800 rounded-lg px-4 py-2 mt-4 font-semibold shadow inline-block">
            🌍 Quick Fact: Did you know that 9 out of 10 people worldwide breathe polluted air every day?
          </div>
        </div>
      </div>
      {/* Articles Section */}
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Learn More About Air Pollution</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <a
              key={idx}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition border border-gray-100 hover:border-blue-200"
            >
              <h3 className="text-lg font-bold text-blue-600 mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-4 text-sm">{article.summary}</p>
              <span className="text-blue-500 font-semibold text-sm">Read more →</span>
            </a>
          ))}
        </div>
      </div>
      {/* Footer Fun Fact */}
      <div className="mt-16 text-center text-gray-500 text-sm">
        <span role="img" aria-label="leaf"></span> Breathe easy, live healthy!
      </div>
      {/* Air Pollution Extras (Map, Facts, Leaderboard) */}
      <AirPollutionExtras />
    </div>
  );
};

export default Home;  