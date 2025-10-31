import Navbar from "./navbar/Navbar";
import { Logo } from "@/components/ui/logo";

const Header = () => {
  return (
    <header data-header="true" className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:h-20">
          <Logo
            imageSrc="/images/logo.png"
            imageAlt="Julian Delgado"
            text="Julian Delgado"
            subtext="Software Engineer"
            size="md"
            showText={true}
          />
          <Navbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
