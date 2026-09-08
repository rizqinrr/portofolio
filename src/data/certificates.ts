import { getAssetUrl } from '../utils/assets';

export interface Certificate {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export const certificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Certificate 1',
    subtitle: 'Has Completed in Python Fundamental for Data Science.',
    image: getAssetUrl('assets/jpg/g1.jpg'),
  },
  {
    id: 'cert-2',
    title: 'Certificate 2',
    subtitle: 'Has Completed in Fundamental SQL Using SELECT Statement.',
    image: getAssetUrl('assets/jpg/g2.jpg'),
  },
  {
    id: 'cert-3',
    title: 'Certificate 3',
    subtitle: 'Has Completed in R Fundamental for Data Science.',
    image: getAssetUrl('assets/jpg/g3.jpg'),
  },
  {
    id: 'cert-4',
    title: 'Certificate 4',
    subtitle: 'Memulai Pemrograman dengan Python.',
    image: getAssetUrl('assets/jpg/g4.jpg'),
  },
  {
    id: 'cert-5',
    title: 'Certificate 5',
    subtitle: 'Belajar Dasar Visualisasi Data.',
    image: getAssetUrl('assets/jpg/g5.jpg'),
  },
  {
    id: 'cert-6',
    title: 'Certificate 6',
    subtitle: 'Course Completion - CISCO Networking Academy',
    image: getAssetUrl('assets/jpg/g6.jpg'),
  },
];

