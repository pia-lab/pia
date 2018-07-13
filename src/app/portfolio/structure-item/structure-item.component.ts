import { Component, Input } from "@angular/core";

@Component({
  selector: "app-structure-item",
  templateUrl: "./structure-item.component.html",
  styleUrls: ["./structure-item.component.scss"]
})
export class StructureItemComponent {

  @Input() structure;


}
