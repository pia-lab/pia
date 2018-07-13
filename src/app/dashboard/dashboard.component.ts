import { Component, OnInit } from "@angular/core";
import { DashboardItemComponent } from "app/dashboard";
import { PermissionsService } from "@security/permissions.service";
import { AuthenticationService } from "@security/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  providers: []
})
export class DashboardComponent implements OnInit {
  public items = [
    { route: "/portfolio", title: "Portefeuille client", icon: "fa-briefcase" },
    { route: "/folders", title: "Traitements", icon: "fa-file-text" }
  ];

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.profileSubject.subscribe(profile => {
      if (profile.portfolios.length == 0) {
        this.router.navigate(["folders"]);
      }
    });
  }
}
