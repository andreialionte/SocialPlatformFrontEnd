import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, Inject, PLATFORM_ID } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { isPlatformBrowser } from '@angular/common';
import { NgxMarqueeModule } from 'ngx-marquee';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgxMarqueeModule, NavbarComponent, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], //For marquee
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      // Define the counter animation
      const counters = document.querySelectorAll('.counter');
      counters.forEach(counter => {
        gsap.fromTo(counter,
          {
            innerHTML: 0
          },
          {
            innerHTML: counter.getAttribute('data-target'),
            duration: 2,
            scrub: 1,
            ease: "power1.inOut",
            onUpdate: function() {
              counter.innerHTML = Math.ceil(Number(counter.innerHTML)).toLocaleString();
            },
            scrollTrigger: {
              trigger: counter,
              start: "top bottom",
              end: "bottom top",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      gsap.to(".animtest", {
        x: "0vw",
        y: 0,
        scale: 1,
        opacity: 1,
        // filter: "blur(0)",
        duration: 3,
        ease: "power3.out"
      });
      
      // Initial setup
      gsap.set(".animtest", {
        x: "-100vw", // Initial position (off-screen to the left)
        y: 250, // Initial vertical position (adjust as needed)
        scale: 3, // Initial scale (enlarged)
        opacity: 0, // Initial opacity (fully transparent)
        // filter: "blur(10px)" // Initial blur (apply blur effect)
      });

      gsap.utils.toArray<HTMLElement>('.testimonials-card').forEach(card => {
        gsap.from(card, {
          y: 100, 
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 100%", 
            end: "bottom top",
            toggleActions: "play none none reverse",
            scrub: true
          }
        });
      });
    }
  }
}