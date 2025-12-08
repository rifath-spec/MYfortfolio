import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';

function App() {
  return (
    <Layout>
      <Hero />
      <Experience />
      <Skills />
      <Education />
      <Projects />
    </Layout>
  );
}

export default App;