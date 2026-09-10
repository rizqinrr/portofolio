import { Signature } from '../../components/ui/Signature';

interface BackCoverProps {
  isActive?: boolean;
}

export default function BackCover({ isActive = true }: BackCoverProps) {
  return (
    <div className="book-page colophon-page">
      <div className="colophon-content">
        <p className="colophon-line">built with react, typescript, and vite</p>
        <p className="colophon-line">styled with tailwind css</p>
        <p className="colophon-line">typeset in playfair display and inter</p>
        <p className="colophon-line">deployed on github pages</p>
        <p className="colophon-line">&copy; 2026 muhammad rizqi nurrahman</p>
        <p className="colophon-closing">
          "this page intentionally left blank."
        </p>
      </div>

      <div className="signature-wrapper">
        <Signature
          text="Muhammad Rizqi Nurrahman"
          color="#f3ede3"
          fontSize={30}
          duration={1.8}
          delay={0.3}
          isActive={isActive}
          className="signature-svg"
        />
      </div>
    </div>
  );
}
