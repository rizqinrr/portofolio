import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookLayout from './components/book/BookLayout';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="*" element={<BookLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
