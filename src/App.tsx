import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Toaster } from '@/components/ui/toaster';
import { HomePage } from '@/pages/HomePage';
import { PlayersPage } from '@/pages/PlayersPage';
import { PlayerWallPage } from '@/pages/PlayerWallPage';
import { MessageFormPage } from '@/pages/MessageFormPage';
import { DonatePage } from '@/pages/DonatePage';
import { ConfirmationPage } from '@/pages/ConfirmationPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/player/:playerId" element={<PlayerWallPage />} />
          <Route path="/player/:playerId/submit" element={<MessageFormPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
        <Toaster />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
