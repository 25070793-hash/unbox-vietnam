import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { CharacterDetailModal } from './components/CharacterDetailModal';

// Views
import { HomeView } from './views/HomeView';
import { CollectionView } from './views/CollectionView';
import { MysteryBoxGame } from './views/games/MysteryBoxGame';
import { LuckyWheelGame } from './views/games/LuckyWheelGame';
import { PersonalityQuizGame } from './views/games/PersonalityQuizGame';
import { TriviaGame } from './views/games/TriviaGame';
import { MissionsView } from './views/MissionsView';
import { VouchersView } from './views/VouchersView';
import { MyCollectionView } from './views/MyCollectionView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderHistoryView } from './views/OrderHistoryView';
import { FavoritesView } from './views/FavoritesView';
import { AboutUsView } from './views/AboutUsView';

const AppContent: React.FC = () => {
  const { currentRoute } = useApp();

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'home':
        return <HomeView />;
      case 'collection':
        return <CollectionView />;
      case 'mystery-box':
        return <MysteryBoxGame />;
      case 'lucky-wheel':
        return <LuckyWheelGame />;
      case 'quiz':
        return <PersonalityQuizGame />;
      case 'trivia':
        return <TriviaGame />;
      case 'missions':
        return <MissionsView />;
      case 'vouchers':
        return <VouchersView />;
      case 'my-collection':
        return <MyCollectionView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'orders':
        return <OrderHistoryView />;
      case 'favorites':
        return <FavoritesView />;
      case 'about':
        return <AboutUsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#292524]">
      {/* Fixed Navigation Bar */}
      <Navbar />

      {/* Main Content View Container */}
      <main className="flex-1 w-full">
        {renderCurrentView()}
      </main>

      {/* Character Details Modal */}
      <CharacterDetailModal />

      {/* Global Toast Feedback */}
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
