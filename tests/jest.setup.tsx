import "@testing-library/jest-dom";
import React, { forwardRef } from "react";
import { TextDecoder, TextEncoder } from "util";

if (typeof global.TextEncoder === "undefined") {
  (global as any).TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
  (global as any).TextDecoder = TextDecoder as any;
}

const clerkState = {
  isSignedIn: false,
  signOut: jest.fn(),
  openUserProfile: jest.fn(),
};

jest.mock("@clerk/nextjs", () => ({
  __esModule: true,
  ClerkProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SignedIn: ({ children }: { children: React.ReactNode }) =>
    clerkState.isSignedIn ? <>{children}</> : null,
  SignedOut: ({ children }: { children: React.ReactNode }) =>
    clerkState.isSignedIn ? null : <>{children}</>,
  SignInButton: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  UserButton: ({ afterSignOutUrl: _afterSignOutUrl, ...props }: Record<string, unknown>) => (
    <div data-testid="user-button" {...props} />
  ),
  useClerk: () => ({
    signOut: clerkState.signOut,
    openUserProfile: clerkState.openUserProfile,
  }),
  useUser: () =>
    clerkState.isSignedIn
      ? {
          user: {
            fullName: "Test User",
            username: "test-user",
            imageUrl: "/avatar.png",
            primaryEmailAddress: { emailAddress: "user@test.com" },
          },
        }
      : { user: null },
  __setClerkState: (value: boolean) => {
    clerkState.isSignedIn = value;
  },
  __resetClerkMocks: () => {
    clerkState.isSignedIn = false;
    clerkState.signOut.mockClear();
    clerkState.openUserProfile.mockClear();
  },
}));

jest.mock("@base-ui-components/react", () => ({
  __esModule: true,
  Separator: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div role="separator" {...props}>
      {children}
    </div>
  ),
}));

const createNavComponent = (tag: keyof JSX.IntrinsicElements, role?: string) =>
  forwardRef<HTMLElement, any>(({ children, ...props }, ref) => {
    const {
      sideOffset,
      alignOffset,
      collisionPadding,
      collisionAvoidance,
      afterSignOutUrl,
      orientation,
      ...rest
    } = props;
    const Component: any = tag;
    return (
      <Component ref={ref} data-testid={role} {...rest}>
        {children}
      </Component>
    );
  });

jest.mock("@base-ui-components/react/navigation-menu", () => ({
  __esModule: true,
  NavigationMenu: {
    Root: createNavComponent("nav", "navigation-root"),
    List: createNavComponent("ul", "navigation-list"),
    Item: createNavComponent("li", "navigation-item"),
    Trigger: createNavComponent("button", "navigation-trigger"),
    Content: createNavComponent("div", "navigation-content"),
    Icon: createNavComponent("span", "navigation-icon"),
    Portal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Backdrop: createNavComponent("div", "navigation-backdrop"),
    Positioner: createNavComponent("div", "navigation-positioner"),
    Popup: createNavComponent("div", "navigation-popup"),
    Arrow: createNavComponent("div", "navigation-arrow"),
    Viewport: createNavComponent("div", "navigation-viewport"),
  },
}));

jest.mock("@base-ui-components/react/switch", () => ({
  __esModule: true,
  Switch: {
    Root: forwardRef<HTMLButtonElement, any>(({ children, onCheckedChange, checked, ...props }, ref) => (
      <button
        ref={ref}
        type="button"
        data-checked={checked}
        onClick={() => onCheckedChange?.(!checked)}
        {...props}
      >
        {children}
      </button>
    )),
    Thumb: forwardRef<HTMLSpanElement, any>(({ children, ...props }, ref) => (
      <span ref={ref} {...props}>
        {children}
      </span>
    )),
  },
}));

const createIcon = (name: string) => (props: React.SVGProps<SVGSVGElement>) => (
  <svg aria-label={`${name}-icon`} {...props} />
);

jest.mock("lucide-react", () => ({
  __esModule: true,
  Menu: createIcon("menu"),
  X: createIcon("close"),
  ChevronRight: createIcon("chevron-right"),
  ChevronLeft: createIcon("chevron-left"),
  Palette: createIcon("palette"),
  Sun: createIcon("sun"),
  Moon: createIcon("moon"),
  User: createIcon("user"),
  LogOut: createIcon("logout"),
  Settings: createIcon("settings"),
}));

jest.mock("framer-motion", () => ({
  __esModule: true,
  motion: {
    div: forwardRef<HTMLDivElement, any>(({ children, transition, initial, animate, exit, whileHover, whileTap, ...props }, ref) => (
      <div
        ref={ref}
        data-transition={transition ? JSON.stringify(transition) : undefined}
        data-initial={initial ? JSON.stringify(initial) : undefined}
        data-animate={animate ? JSON.stringify(animate) : undefined}
        data-exit={exit ? JSON.stringify(exit) : undefined}
        data-while-hover={whileHover ? JSON.stringify(whileHover) : undefined}
        data-while-tap={whileTap ? JSON.stringify(whileTap) : undefined}
        {...props}
      >
        {children}
      </div>
    )),
    button: forwardRef<HTMLButtonElement, any>(({ children, whileHover, whileTap, ...props }, ref) => (
      <button
        ref={ref}
        type="button"
        data-while-hover={whileHover ? JSON.stringify(whileHover) : undefined}
        data-while-tap={whileTap ? JSON.stringify(whileTap) : undefined}
        {...props}
      >
        {children}
      </button>
    )),
    a: forwardRef<HTMLAnchorElement, any>(({ children, whileHover, whileTap, ...props }, ref) => (
      <a
        ref={ref}
        data-while-hover={whileHover ? JSON.stringify(whileHover) : undefined}
        data-while-tap={whileTap ? JSON.stringify(whileTap) : undefined}
        {...props}
      >
        {children}
      </a>
    )),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => (
    <a href={typeof href === "string" ? href : href?.pathname ?? "#"} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, priority, fill, ...props }: any) => (
    <img src={typeof src === "string" ? src : src?.src ?? src} alt={alt} {...props} />
  ),
}));

jest.mock("next/font/google", () => ({
  __esModule: true,
  Geist: () => ({ variable: "geist-sans" }),
  Geist_Mono: () => ({ variable: "geist-mono" }),
}));

jest.mock("isomorphic-dompurify", () => ({
  __esModule: true,
  default: {
    sanitize: (value: string) =>
      typeof value === "string" ? value.replace(/<script.*?>.*?<\/script>/gi, "") : value,
  },
}));

jest.mock("next/navigation", () => ({
  __esModule: true,
  usePathname: () => "/",
}));

const globalAny: any = globalThis;

globalAny.__setClerkSignedIn = (value: boolean) => {
  const clerk = require("@clerk/nextjs");
  clerk.__setClerkState(value);
};

beforeEach(() => {
  const clerk = require("@clerk/nextjs");
  clerk.__resetClerkMocks();
});

globalAny.ResizeObserver = class {
  observe() {
    return undefined;
  }
  disconnect() {
    return undefined;
  }
};

globalAny.matchMedia = (query: string) => ({
  media: query,
  matches: false,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

globalAny.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(() => cb(Date.now()), 0);
globalAny.cancelAnimationFrame = (id: number) => clearTimeout(id);
