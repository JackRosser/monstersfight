import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appYellowbox]'
})
export class YellowboxDirective {

  constructor(private card: ElementRef ) {}

  @HostListener("click") onClick() {
this.changeBorderColor("yellow")
  }

border:boolean = true

private changeBorderColor(color: string):void {

this.border = !this.border
if (!this.border) {this.card.nativeElement.style.border = `5px solid ${color}`}
else if (this.border) {this.card.nativeElement.style.border =""}
}

}
