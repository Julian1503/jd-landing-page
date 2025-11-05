import React from "react";

type Children = { children?: React.ReactNode };

type UserButtonProps = {
  appearance?: Record<string, unknown>;
  afterSignOutUrl?: string;
};

type MockClerkContext = {
  signOut: () => Promise<void> | void;
  openUserProfile: () => Promise<void> | void;
  loaded: true;
};

type SignInButtonProps = {
  mode?: string;
};

const identity = ({ children }: Children) => <>{children}</>;

export const ClerkProvider = identity;
export const SignedIn = identity;
export const SignedOut = identity;

export const SignInButton = ({ children }: Children & SignInButtonProps) => {
  return <>{typeof children === "function" ? children() : children}</>;
};

export const UserButton = ({ appearance }: UserButtonProps) => {
  const size = appearance?.elements && (appearance.elements as Record<string, string>).avatarBox ? "2rem" : "2.5rem";

  return (
    <div
      aria-label="User menu"
      data-testid="mock-user-button"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "9999px",
        background: "var(--muted)",
        color: "var(--muted-foreground)",
        fontSize: "0.75rem",
        fontWeight: 600,
      }}
    >
      U
    </div>
  );
};

export const useClerk = (): MockClerkContext => ({
  signOut: () => undefined,
  openUserProfile: () => undefined,
  loaded: true,
});

export const useAuth = () => ({ userId: "mock-user" });
export const useUser = () => ({
  isSignedIn: true,
  user: {
    id: "mock-user",
    fullName: "Mock User",
    primaryEmailAddress: {
      emailAddress: "mock@example.com",
    },
  },
});
