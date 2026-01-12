import { Component, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, BookOpen, Menu, X, ChevronRight, Play } from 'lucide-angular';


@Component({
  selector: 'app-isoko-landing-page',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './isoko-landing-page.html',
  styleUrl: './isoko-landing-page.css',
})
export class IsokoLandingPage {
  isMenuOpen = false;
  scrolled = false;

  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrolled = window.scrollY >50;
  }

  toggleMenu () {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
