/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseFoundation from './pages/CourseFoundation';
import CourseCoaching from './pages/CourseCoaching';
import Faculty from './pages/Faculty';
import About from './pages/About';
import Cases from './pages/Cases';
import CampusFlorence from './pages/CampusFlorence';
import CampusMilan from './pages/CampusMilan';
import { SiteSettingsProvider } from './contexts/site-settings-context';

export default function App() {
  return (
    <SiteSettingsProvider>
      <div className="min-h-screen font-sans">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/foundation" element={<CourseFoundation />} />
            <Route path="/courses/coaching" element={<CourseCoaching />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/about" element={<About />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/campus/florence" element={<CampusFlorence />} />
            <Route path="/campus/milan" element={<CampusMilan />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </SiteSettingsProvider>
  );
}
