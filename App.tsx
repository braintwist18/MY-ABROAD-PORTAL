
import React from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Coaching } from './pages/Coaching';
import { Visa } from './pages/Visa';
import { Countries } from './pages/Countries';
import { Contact } from './pages/Contact';
import { Page } from './types';
import { AnimatePresence, motion } from 'framer-motion';
import IELTSQuiz from './components/IELTSQuiz';

const App: React.FC = () => {
  const [activePage, setActivePage] = React.useState<Page>('quiz');

  // Simple Page Router
  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Home setActivePage={setActivePage} />;
      case 'coaching': return <Coaching />;
      case 'visa': return <Visa />;
      case 'countries': return <Countries />;
      case 'countries': return <Countries />;
      case 'contact': return <Contact />;
      case 'quiz': return <IELTSQuiz />;
      default: return <Home setActivePage={setActivePage} />;
    }
  };

  // Scroll to top on page change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default App;
