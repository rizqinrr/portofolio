import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookLayout from './components/book/BookLayout';
import PrintDocument from './pages/print/PrintDocument';

export default function App() {
  const isPrint =
    new URLSearchParams(window.location.search).get('print') === '1';

  if (isPrint) return <PrintDocument />;

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="*" element={<BookLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
