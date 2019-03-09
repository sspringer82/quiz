import React from 'react';
import './ThemeSwitcher.css';

interface Props {
  onChangeTheme: () => void;
}

export default function ThemeSwitcher({ onChangeTheme }: Props) {
  return (
    <div className="ThemeSwitcher container">
      <button onClick={onChangeTheme}>light/dark</button>
    </div>
  );
}
