import React from 'react';

const PREVENTIVE_STRATEGIES = [
  'Reduce use of vehicles and carpool when possible.',
  'Avoid burning trash or leaves.',
  'Support clean energy initiatives.',
  'Plant trees and maintain green spaces.',
];

const PreventiveStrategies = () => (
  <section className="mb-6">
    <h2 className="text-lg font-semibold mb-2">Preventive Strategies</h2>
    <ul className="list-disc ml-6">
      {PREVENTIVE_STRATEGIES.map((strat, i) => (
        <li key={i}>{strat}</li>
      ))}
    </ul>
  </section>
);

export default PreventiveStrategies; 