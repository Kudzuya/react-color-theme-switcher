import {useEffect, useState} from "react"

//Icons
import { XMarkIcon, SunIcon, MoonIcon, SwatchIcon } from "@heroicons/react/24/outline";
 
//Custom hooks
import useLocalStorage from "../hooks/useLocalStorage";

// Styles
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  const [isColorPickibg, setColorPicking] = useState();

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark').matches
  const [theme, setTheme] = useLocalStorage('reaact-todo,color.theme',defaultDark ? 'dark' : "light");
  const [hue, setHue] = useLocalStorage('react-todo.color', '240');

  useEffect(() =>{
        document.documentElement.setAttribute('color-scheme', theme)
  }, [theme])

  useEffect(() =>{
        document.documentElement.style.setProperty('--_hue', hue)
}, [hue])

  return (
    <aside
    className={styles.wrapper}
    style={{
        backgroundColor: isColorPickibg 
        ? 'hsl(var(--muted) / .6)'
        : 'transparent'
    }}>
    {
        isColorPickibg 
        ? (
            <>
                <button
                className={`btn ${styles.close}`}
                aria-label = "Close color picking mode"
                onClick={() =>setColorPicking(false)}>
                    <XMarkIcon />
                </button>
                <input 
                    className={styles.picker}
                    type="range"
                    min='0'
                    max='360'
                    aria-label='Change color theme slider'
                    value={hue}
                    onInput={(e) =>setHue(e.target.value)}
                    />
            </>
        )
        : (
            <div className={styles.btns}>
                <button className="btn"
                    aeia-label={`Change theme to ${theme === 'light' ? "dark" : "light"} mode`}
                    role="switch"
                    onClick={() => setTheme(theme === 'light'? 'dark' : 'light')}>
                    {theme === 'dark' ? <SunIcon/> : <MoonIcon /> }
                </button>
                <button 
                    className="btn"
                    aria-label="Enable color picking mode"
                    onClick={() =>setColorPicking(true)}>
                    <SwatchIcon />
                </button>
            </div>
        )
    }
    </aside>
  )
}

export default ThemeSwitcher