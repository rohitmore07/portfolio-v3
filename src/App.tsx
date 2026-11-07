import { useEffect, useState } from 'react';
import { Navbar, RoutePath } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ContactPage } from './pages/ContactPage';
import { BlogsPage } from './pages/BlogsPage';
import { BooksPage } from './pages/BooksPage';
import { FavouritesPage } from './pages/FavouritesPage';

const VALID_PATHS: RoutePath[] = [
  '/',
  '/projects',
  '/experience',
  '/contact',
  '/blogs',
  '/books',
  '/favourites',
];

function getInitialPath(): RoutePath {
  if (typeof window === 'undefined') return '/';
  const raw = window.location.pathname as RoutePath;
  return VALID_PATHS.includes(raw) ? raw : '/';
}

export function App() {
  const [currentPath, setCurrentPath] = useState<RoutePath>(getInitialPath);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(getInitialPath());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (path: RoutePath) => {
    if (path === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    try {
      window.history.pushState({}, '', path);
    } catch {
      // Ignore history errors in restricted environments
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <div className="flex flex-col items-center relative min-h-screen w-full">
      {/* Global top horizontal dashed guide and center vertical dashed column rails */}
      <div className="absolute border-t w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 top-12 z-10 pointer-events-none" />
      <div className="border-x border-dashed border-[#272727] dark:border-neutral-200 bg-transparent absolute z-10 top-0 bottom-0 w-full max-w-200 pointer-events-none" />

      <div className="flex flex-col items-center z-50">
        <Navbar currentPath={currentPath} onNavigate={navigate} />
      </div>

      {currentPath === '/' && <HomePage onNavigate={navigate} />}
      {currentPath === '/projects' && <ProjectsPage onNavigate={navigate} />}
      {currentPath === '/experience' && <ExperiencePage onNavigate={navigate} />}
      {currentPath === '/contact' && <ContactPage onNavigate={navigate} />}
      {currentPath === '/blogs' && <BlogsPage onNavigate={navigate} />}
      {currentPath === '/books' && <BooksPage onNavigate={navigate} />}
      {currentPath === '/favourites' && <FavouritesPage onNavigate={navigate} />}
    </div>
  );
}

export default App;
