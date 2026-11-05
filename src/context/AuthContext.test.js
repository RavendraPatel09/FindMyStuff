import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider, useAuth } from './AuthContext';

global.IS_REACT_ACT_ENVIRONMENT = true;

const AuthProbe = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <span>{user ? user.name : 'signed out'}</span>
      <button onClick={() => login({ name: 'Ravendra' })}>Log in</button>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

describe('AuthProvider', () => {
  let container;
  let root;

  beforeEach(() => {
    localStorage.clear();
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  const renderProvider = () => {
    act(() => {
      root.render(
        <AuthProvider>
          <AuthProbe />
        </AuthProvider>
      );
    });
  };

  it('restores a valid saved user', () => {
    localStorage.setItem('findmystuff_user', JSON.stringify({ name: 'Ravendra' }));

    renderProvider();

    expect(container.textContent).toContain('Ravendra');
  });

  it('clears malformed saved user data without crashing the app', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem('findmystuff_user', '{invalid json');

    try {
      renderProvider();

      expect(container.textContent).toContain('signed out');
      expect(localStorage.getItem('findmystuff_user')).toBeNull();
      expect(errorSpy).toHaveBeenCalled();
    } finally {
      errorSpy.mockRestore();
    }
  });

  it('persists login state and clears it on logout', () => {
    renderProvider();
    const buttons = container.querySelectorAll('button');

    act(() => buttons[0].click());
    expect(localStorage.getItem('findmystuff_user')).toBe('{"name":"Ravendra"}');

    act(() => buttons[1].click());
    expect(localStorage.getItem('findmystuff_user')).toBeNull();
    expect(container.textContent).toContain('signed out');
  });
});
