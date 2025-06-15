import React, { ReactNode, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, FileText, Printer, LogOut, Menu, ChevronLeft, ChevronRight, Settings, Users, BarChart } from 'lucide-react';
import Logo from './ui/Logo';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [collapsed, setCollapsed] = useState(false);

  // Check for authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/');
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/');
      }
    });
    
    // Load collapsed state from localStorage
    const savedCollapsed = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsed) {
      setCollapsed(savedCollapsed === 'true');
    }
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'Logout realizado com sucesso',
        description: 'Você foi desconectado do sistema.',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Erro ao fazer logout',
        description: 'Ocorreu um erro ao tentar desconectar.',
        variant: 'destructive',
      });
    }
  };

  // Toggle sidebar collapsed state
  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
  };

  // Check if the current route matches the menu item
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`h-screen bg-white border-r border-black/10 transition-all duration-300 ease-in-out z-30 ${
          collapsed ? 'w-[70px]' : 'w-[240px]'
        }`}
      >
        {/* Sidebar Header */}
        <div className="relative h-16 flex items-center justify-between border-b border-black/10 px-4">
          <div className={`flex items-center transition-all ${collapsed ? 'justify-center w-full' : ''}`}>
            {!collapsed && <Logo />}
            {collapsed && <Logo small />}
          </div>
          <button
            onClick={toggleSidebar}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-8 w-8 rounded-full bg-white border border-black/10 shadow-md flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-50 focus:outline-none transition-colors z-50"
            aria-label={collapsed ? "Expandir menu" : "Retrair menu"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex flex-col h-[calc(100%-4rem)] overflow-y-auto">
          <div className="flex-grow py-4">
            <ul className="space-y-1 px-2">
              <li>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center ${collapsed ? 'justify-center' : ''} px-3 py-3 rounded-md ${
                    isActive('/dashboard') 
                      ? 'bg-fiscal-green-50 text-fiscal-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Home size={20} className={isActive('/dashboard') ? 'text-fiscal-green-500' : ''} />
                  {!collapsed && <span className="ml-3">Início</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/notes/new" 
                  className={`flex items-center ${collapsed ? 'justify-center' : ''} px-3 py-3 rounded-md ${
                    isActive('/notes/new') 
                      ? 'bg-fiscal-green-50 text-fiscal-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FileText size={20} className={isActive('/notes/new') ? 'text-fiscal-green-500' : ''} />
                  {!collapsed && <span className="ml-3">Nova Nota</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/print" 
                  className={`flex items-center ${collapsed ? 'justify-center' : ''} px-3 py-3 rounded-md ${
                    isActive('/print') 
                      ? 'bg-fiscal-green-50 text-fiscal-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Printer size={20} className={isActive('/print') ? 'text-fiscal-green-500' : ''} />
                  {!collapsed && <span className="ml-3">Impressão</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/customers" 
                  className={`flex items-center ${collapsed ? 'justify-center' : ''} px-3 py-3 rounded-md ${
                    isActive('/customers') 
                      ? 'bg-fiscal-green-50 text-fiscal-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Users size={20} className={isActive('/customers') ? 'text-fiscal-green-500' : ''} />
                  {!collapsed && <span className="ml-3">Clientes</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/reports" 
                  className={`flex items-center ${collapsed ? 'justify-center' : ''} px-3 py-3 rounded-md ${
                    isActive('/reports') 
                      ? 'bg-fiscal-green-50 text-fiscal-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <BarChart size={20} className={isActive('/reports') ? 'text-fiscal-green-500' : ''} />
                  {!collapsed && <span className="ml-3">Relatórios</span>}
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="mt-auto pb-4 border-t border-black/5 pt-2">
            <ul className="space-y-1 px-2">
              <li>
                <Link 
                  to="/settings" 
                  className={`flex items-center ${collapsed ? 'justify-center' : ''} px-3 py-3 rounded-md ${
                    isActive('/settings') 
                      ? 'bg-fiscal-green-50 text-fiscal-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings size={20} className={isActive('/settings') ? 'text-fiscal-green-500' : ''} />
                  {!collapsed && <span className="ml-3">Configurações</span>}
                </Link>
              </li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className={`w-full flex items-center ${collapsed ? 'justify-center' : ''} px-3 py-3 rounded-md text-red-500 hover:bg-red-50`}
                >
                  <LogOut size={20} />
                  {!collapsed && <span className="ml-3">Sair</span>}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300">
        {/* Mobile Header - only visible on small screens */}
        <header className="bg-black text-white py-2 px-4 md:hidden flex items-center">
          <button 
            onClick={toggleSidebar} 
            className="mr-2 focus:outline-none"
            aria-label={collapsed ? "Expandir menu" : "Retrair menu"}
          >
            <Menu size={24} />
          </button>
          <Logo />
          <h1 className="ml-3 text-xl font-cascadia">Fiscal Flow Notes</h1>
        </header>
        
        {/* Content Area */}
        <div className="flex-1 overflow-auto flex flex-col min-h-[calc(100vh-56px)]">
          <div className="flex-grow container mx-auto py-6 px-4">
            {children}
          </div>
          
          <footer className="bg-black text-white py-4 text-center mt-auto">
            <div className="container mx-auto">
              <p className="text-sm">
                © {new Date().getFullYear()} Fiscal Flow Notes. Todos os direitos reservados.
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Layout;
