import NavbarLayout from "./NavbarLayout";
import { Logo } from "@/components/ui/logo";

const Header = () => {
  return (
    <header data-header="true" className="w-full sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:h-20 p-3">
          <Logo
            imageSrc="/images/logo.png"
            imageAlt="Julian Delgado"
            text="Julian Delgado"
            subtext="Software Engineer"
            size="md"
            showText={true}
            ringStyle="none"
            textStyle="primary"
            subtextStyle="muted"
          />
          <NavbarLayout />
        </div>
      </div>
    </header>
  );
};

export default Header;
