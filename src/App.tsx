import { BrowserRouter, Routes, Route } from 'react-router-dom';

import React from 'react';
import './App.css'
import { lazy, Suspense } from 'react'

import hackathonGraphic from './assets/hackathon-graphic.svg'
import naverLogo from './assets/naver-logo.svg'

const HomePage  = lazy(() => import('./pages/HomePage'))
const TasksPage = lazy(() => import('./pages/TasksPage'))
const StatsPage = lazy(() => import('./pages/StatsPage'))

import Layout from './components/Layout.tsx';
import {PATH} from './routes/route.ts'

function NotFoundPage() {
  return <div className="text-red-600">404 — Page not found</div>
}

function FallbackPage() {
    return <div className="text-gray-600">Loading...</div>
}

// Main app structure with providers, routing, and global state
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<FallbackPage />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path={PATH.home} element={<HomePage />} />
            <Route path={PATH.tasks} element={<TasksPage />} />
            <Route path={PATH.stats} element={<StatsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;