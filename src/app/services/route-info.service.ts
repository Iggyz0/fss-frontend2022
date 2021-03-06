import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteInfoService {

  currentActiveLink: string = '';
  previousActiveLink: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.previousActiveLink = this.getActiveUrlPath();
    this.currentActiveLink = this.previousActiveLink;
  }

  monitorRouteChange() {
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousActiveLink = this.currentActiveLink;
        this.currentActiveLink = this.getActiveUrlPath();

        // if(this.previousActiveLink.trim().toLowerCase().includes("all")) {
        //   this.previousActiveLink = "/all";
        // }

        // if(this.currentActiveLink.trim().toLowerCase().includes("all")) {
        //   this.currentActiveLink = "/all";
        // }
        
        let prev = this.getHtmlElement(this.previousActiveLink.substring(1));
        let cur = this.getHtmlElement(this.currentActiveLink.substring(1));
        
        if (prev != null) {
          prev.classList.remove("activeRouteLink");
        }
        if (cur != null) {
          cur.classList.add("activeRouteLink");
        }
      }
    });
  }

  getActiveUrlPath(): string {
    let path = this.router.url.split('?')[0];
    return path;
  }

  getHtmlElement(id: string): HTMLInputElement {
    if (id == '' || id == null) {
      id = "welcome";
    }

    if (id.includes("notes")) {
      id = "notes";
    }

    if (id.includes("files")) {
      id = "files";
    }

    if (id.includes("audio")) {
      id = "audio";
    }

    if (id.includes("photos")) {
      id = "photos";
    }

    return (<HTMLInputElement>document.getElementById(id));
  }
}
