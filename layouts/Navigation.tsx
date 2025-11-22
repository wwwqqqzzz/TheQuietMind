
import React, { useState, useRef, useEffect } from 'react';
import { ViewState } from '../types/index';
import { NavButton } from '../components/ui/NavButton';
import { MenuIcon, XIcon, GlobeIcon, MoonIcon, SunIcon } from '../components/Icons';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const Navigation = ({ view, setView }: { view: ViewState, setView: (v: ViewState) => void }) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (targetView: ViewState) => {
    setView(targetView);
    setIsMoreOpen(false);
    setIsMobileMenuOpen(false);
    // Reset URL if user navigates away from /admin
    if (window.location.pathname === '/admin') {
      window.history.pushState({}, '', '/');
    }
  };

  const isMoreActive = [
    ViewState.REACTIONS, ViewState.REACTION_DETAIL,
    ViewState.INSPIRATION, ViewState.INSPIRATION_DETAIL,
    ViewState.FRAGMENTS, ViewState.DIRECTORY, ViewState.ABOUT
  ].includes(view);

  const LanguageSwitcher = ({ mobile = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage } = useLanguage();
    const switcherRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const langs: {code: any, label: string}[] = [
        {code: 'en', label: 'EN'},
        {code: 'zh-CN', label: '简'},
        {code: 'zh-TW', label: '繁'},
        {code: 'ja', label: 'JP'},
        {code: 'ko', label: 'KR'},
    ];
    
    return (
        <div className={`relative ${!mobile ? 'ml-6 pl-6 border-l border-[var(--border-main)]' : ''}`} ref={switcherRef}>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-2"
              title="Select Language"
            >
               <GlobeIcon className="w-4 h-4" />
            </button>
            
            {isOpen && (
              <div className={`absolute ${mobile ? 'left-0 bottom-full mb-2' : 'right-0 top-full mt-4'} bg-[var(--bg-card)] border border-[var(--border-main)] shadow-none z-50 flex flex-col min-w-[80px]`}>
                 {langs.map(l => (
                   <button 
                      key={l.code} 
                      onClick={() => { setLanguage(l.code); setIsOpen(false); }}
                      className={`block w-full text-left px-4 py-3 text-[10px] uppercase tracking-widest hover:bg-[var(--bg-hover)] hover:text-[var(--text-main)] ${language === l.code ? 'text-[var(--text-main)] font-bold' : 'text-[var(--text-muted)]'}`}
                   >
                     {l.label}
                   </button>
                 ))}
              </div>
            )}
        </div>
    );
  }
  
  const ThemeToggle = ({ mobile = false }) => (
    <button 
      onClick={toggleTheme} 
      className={`${!mobile ? 'ml-6' : ''} text-[var(--text-muted)] hover:text-[var(--text-main)]`}
      title={theme === 'light' ? 'Ink Mode' : 'Light Mode'}
    >
      {theme === 'light' ? <MoonIcon className="w-4 h-4" /> : <SunIcon className="w-4 h-4" />}
    </button>
  );

  const MobileMenu = () => (
    <div className="fixed inset-0 bg-[var(--bg-main)] z-50 flex flex-col p-6 overflow-y-auto h-dvh">
      <div className="flex justify-end mb-8 flex-shrink-0">
        <button onClick={() => setIsMobileMenuOpen(false)} className="text-[var(--text-main)] p-2">
          <XIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-col gap-6 items-start w-full flex-grow min-h-0">
          <button onClick={() => handleNavClick(ViewState.JOURNAL)} className="text-3xl font-serif text-[var(--text-main)] font-medium hover:opacity-70 text-left">{t('nav.journal')}</button>
          <button onClick={() => handleNavClick(ViewState.LIBRARY)} className="text-3xl font-serif text-[var(--text-main)] font-medium hover:opacity-70 text-left">{t('nav.library')}</button>
          <button onClick={() => handleNavClick(ViewState.PORTFOLIO)} className="text-3xl font-serif text-[var(--text-main)] font-medium hover:opacity-70 text-left">{t('nav.portfolio')}</button>
          
          <div className="h-px w-24 bg-[var(--border-main)] my-2"></div>
          
          <div className="flex flex-col gap-4 mt-2">
            <button onClick={() => handleNavClick(ViewState.REACTIONS)} className="text-lg font-serif text-[var(--text-muted)] hover:text-[var(--text-main)] text-left">{t('nav.reactions')}</button>
            <button onClick={() => handleNavClick(ViewState.INSPIRATION)} className="text-lg font-serif text-[var(--text-muted)] hover:text-[var(--text-main)] text-left">{t('nav.imaginarium')}</button>
            <button onClick={() => handleNavClick(ViewState.FRAGMENTS)} className="text-lg font-serif text-[var(--text-muted)] hover:text-[var(--text-main)] text-left">{t('nav.fragments')}</button>
            <button onClick={() => handleNavClick(ViewState.DIRECTORY)} className="text-lg font-serif text-[var(--text-muted)] hover:text-[var(--text-main)] text-left">{t('nav.archive')}</button>
            <button onClick={() => handleNavClick(ViewState.ABOUT)} className="text-lg font-serif text-[var(--text-muted)] hover:text-[var(--text-main)] text-left">{t('nav.about')}</button>
          </div>
          
          <div className="mt-auto w-full pt-8 pb-4 border-t border-[var(--border-main)] flex items-center justify-between">
             <div className="flex gap-4">
               <LanguageSwitcher mobile={true} />
               <ThemeToggle mobile={true} />
             </div>
          </div>
      </div>
    </div>
  );

  if (view === ViewState.ADMIN) return null; // Hide nav completely in admin login

  return (
    <nav className="sticky top-0 z-40 bg-[var(--bg-main)] bg-opacity-95 border-b border-[var(--border-main)] py-5 md:py-8">
      <div className="max-w-[1500px] mx-auto px-5 md:px-12 flex items-center justify-between">
        <div 
          className="cursor-pointer group flex-shrink-0" 
          onClick={() => handleNavClick(ViewState.HOME)}
        >
          <span className="font-serif font-medium text-[var(--text-main)] tracking-[0.25em] text-xs md:text-sm group-hover:opacity-70">{t('app.title')}</span>
        </div>

        <div className="lg:hidden">
           <button onClick={() => setIsMobileMenuOpen(true)} className="text-[var(--text-main)]">
             <MenuIcon className="w-6 h-6" />
           </button>
        </div>
        
        <div className="items-center gap-8 hidden lg:flex">
          <NavButton label={t('nav.journal')} isActive={view === ViewState.JOURNAL || view === ViewState.ARTICLE} onClick={() => handleNavClick(ViewState.JOURNAL)} />
          <NavButton label={t('nav.library')} isActive={view === ViewState.LIBRARY || view === ViewState.BOOK_DETAIL} onClick={() => handleNavClick(ViewState.LIBRARY)} />
          <NavButton label={t('nav.portfolio')} isActive={view === ViewState.PORTFOLIO || view === ViewState.PORTFOLIO_DETAIL} onClick={() => handleNavClick(ViewState.PORTFOLIO)} />
          
          <div className="relative" ref={dropdownRef}>
            <NavButton 
              label={t('nav.more')} 
              isActive={isMoreActive} 
              onClick={() => setIsMoreOpen(!isMoreOpen)} 
              hasDropdown 
            />
            
            {isMoreOpen && (
              <div className="absolute right-0 mt-6 w-56 bg-[var(--bg-card)] border border-[var(--border-main)] py-4 z-50 shadow-lg">
                <button onClick={() => handleNavClick(ViewState.REACTIONS)} className="block w-full text-left px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]">
                   {t('nav.reactions')}
                </button>
                <button onClick={() => handleNavClick(ViewState.INSPIRATION)} className="block w-full text-left px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]">
                   {t('nav.imaginarium')}
                </button>
                <button onClick={() => handleNavClick(ViewState.FRAGMENTS)} className="block w-full text-left px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]">
                   {t('nav.fragments')}
                </button>
                <div className="h-px bg-[var(--border-main)] my-2 mx-6"></div>
                <button onClick={() => handleNavClick(ViewState.DIRECTORY)} className="block w-full text-left px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]">
                   {t('nav.archive')}
                </button>
                <button onClick={() => handleNavClick(ViewState.ABOUT)} className="block w-full text-left px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]">
                   {t('nav.about')}
                </button>
              </div>
            )}
          </div>

          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
      
      {isMobileMenuOpen && <MobileMenu />}
    </nav>
  );
};

export default Navigation;
