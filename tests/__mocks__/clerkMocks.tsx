import * as React from 'react';
export const SignedIn = ({ children }: any) => null;
export const SignedOut = ({ children }: any) => <>{children}</>;
export const SignInButton = ({ children }: any) => <>{children}</>;
export const UserButton = (props: any) => <div data-testid="user-button" {...props} />;
export const useClerk = () => ({ signOut: jest.fn(), openUserProfile: jest.fn() });
export const useUser = () => ({ user: { fullName: 'Test User', imageUrl: '/avatar.png', primaryEmailAddress: { emailAddress: 'user@test.com' } } });
