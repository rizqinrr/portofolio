import { certificates } from '../../data/certificates';
import { ScrollTiltedGrid } from '../../components/ui/ScrollTiltedGrid';

interface GalleryPageProps {
  isActive?: boolean;
}

export default function GalleryPage(_props: GalleryPageProps) {
  const images = certificates.map((cert) => ({
    src: cert.image,
    alt: cert.subtitle,
  }));

  return (
    <div className="book-page gallery-page">
      <div className="gallery-scroll" data-inner-scroll>
        <ScrollTiltedGrid
          images={images}
          aspectRatio="16 / 9"
          loop
          initialCycles={3}
          batchSize={2}
        />
      </div>
    </div>
  );
}
