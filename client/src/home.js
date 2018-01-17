import React from 'react';
import {StatsCard, TextCard} from './card';

const Home = () => (
  <div className="wrapper">
    <StatsCard title="Lights Activated" type="stats-down" stats="123,194"></StatsCard>
    <StatsCard title="Doors Activated" type="stats-up" stats="12,321"></StatsCard>
    <StatsCard title="Sensors Activated" type="stats-up" stats="314"></StatsCard>
    <TextCard title="Lights" desc="On" state="unlocked"/>
    <TextCard title="Door" desc="Locked" state="locked"/>
  </div>
)

export default Home;