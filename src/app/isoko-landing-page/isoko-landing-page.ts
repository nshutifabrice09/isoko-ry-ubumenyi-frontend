import { Component, HostListener} from '@angular/core';
import { NgClass } from "../../../node_modules/@angular/common/types/_common_module-chunk";
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-isoko-landing-page',
  imports: [NgClass, CommonModule, LucideAngularModule],
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
