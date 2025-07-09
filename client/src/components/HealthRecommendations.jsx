import React from 'react';

const HEALTH_RECOMMENDATIONS = [
  'Limit outdoor activities when AQI is high.',
  'Keep windows closed and use air purifiers indoors.',
  'Wear a mask if you need to go outside.',
  'Monitor symptoms if you have respiratory issues.',
];

const HealthRecommendations = () => (
  <section className="mb-6">
    <h2 className="text-lg font-semibold mb-2">Health Recommendations</h2>
    <ul className="list-disc ml-6">
      {HEALTH_RECOMMENDATIONS.map((rec, i) => (
        <li key={i}>{rec}</li>
      ))}
    </ul>
  </section>
);

export default HealthRecommendations; 