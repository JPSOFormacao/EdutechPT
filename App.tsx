import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingView } from './features/landing/LandingView';
import { LoginView } from './features/auth/LoginView';
import { DashboardView } from './features/dashboard/DashboardView';
import { CourseManager } from './features/courses/CourseManager';
import { User, Course, UserRole } from './types';
import { MOCK_COURSES, MOCK_TESTIMONIALS } from './services/mockData';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('landing'); // landing, login, dashboard, courses
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [editingCourse, setEditingCourse] = useState<Course | null | undefined>(undefined);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
  };

  const handleSaveCourse = (courseData: Course) => {
    if (editingCourse) {
      // Update
      setCourses(courses.map(c => c.id === courseData.id ? courseData : c));
    } else {
      // Create
      const newCourse: Course = { ...courseData, id: Math.random().toString(36).substr(2, 9), enrolledCount: 0, image: 'https://picsum.photos/800/600' };
      setCourses([...courses, newCourse]);
    }
    setEditingCourse(undefined); // Close editor
    setCurrentView('dashboard'); // Or stay in course list if implemented
  };

  // Render logic
  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <LandingView 
            courses={courses} 
            testimonials={MOCK_TESTIMONIALS} 
            onCourseClick={(course) => setCurrentView('login')} 
          />
        );
      case 'login':
        return (
          <LoginView 
            onLoginSuccess={handleLoginSuccess} 
            onBack={() => setCurrentView('landing')} 
          />
        );
      case 'dashboard':
        if (!currentUser) return <LandingView courses={courses} testimonials={MOCK_TESTIMONIALS} onCourseClick={() => setCurrentView('login')} />;
        return (
          <DashboardView 
            user={currentUser} 
            courses={courses} 
            onNavigate={(view) => {
              if (view === 'courses') {
                 // For simplified demo, navigating to courses means opening the manager for a new course or list
                 setEditingCourse(undefined); // Start fresh
                 setCurrentView('courses');
              }
            }}
          />
        );
      case 'courses':
        if (!currentUser || (currentUser.role === UserRole.STUDENT)) return null;
        return (
          <div className="max-w-4xl mx-auto p-8">
             <div className="mb-6">
                <button onClick={() => setCurrentView('dashboard')} className="text-slate-500 hover:text-slate-900 mb-4">← Voltar ao Dashboard</button>
                <CourseManager 
                  course={editingCourse || null}
                  currentUserId={currentUser.id}
                  onSave={handleSaveCourse}
                  onCancel={() => setCurrentView('dashboard')}
                />
             </div>
          </div>
        );
      default:
        return <div className="p-10 text-center">Página não encontrada</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      {/* Hide navbar on login page for cleaner look */}
      {currentView !== 'login' && (
        <Navbar 
          user={currentUser} 
          onLoginClick={() => setCurrentView('login')} 
          onLogoutClick={handleLogout}
          onNavigate={setCurrentView}
        />
      )}
      <main>
        {renderView()}
      </main>
    </div>
  );
};

export default App;
