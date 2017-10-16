import { Component, Renderer2 } from '@angular/core';
import ThemeList from '../config/ThemeList';
import ThemeService from '../services/Theme.service';

@Component({
    selector: 'cmp-theme-selector',
    templateUrl: './themeSelector.component.html',
})
class ThemeSelectorComponent {
    public currentTheme: string;
    public themeList: ThemeList;
    private __themeService: ThemeService;
    private __bodyElement: HTMLBodyElement;

    public constructor(renderer: Renderer2, themeService: ThemeService) {
        this.themeList = ThemeList;
        this.__themeService = themeService;
        this.__bodyElement = document.body as HTMLBodyElement;

        themeService.getThemeObservable().subscribe((theme: string) => {
            this.currentTheme = theme;
            renderer.setAttribute(this.__bodyElement, 'class', theme);
        });
    }

    public setNewTheme(): void {
        this.__themeService.setNewTheme();
    }
}

export default ThemeSelectorComponent;
