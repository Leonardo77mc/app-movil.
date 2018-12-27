import { Directive, ElementRef } from '@angular/core';
import { Keyboard } from "@ionic-native/keyboard";

@Directive({
    selector: '[enfocar]' // Attribute selector
})

export class EnfocarDirective {


    constructor(private element: ElementRef, private keyboard: Keyboard) {
        console.log('Hello EnfocarDirective Directive');
    }

    ngAfterViewInit() {
        const element = this.element.nativeElement.querySelector('input');
        // we need to delay our call in order to work with ionic ...
        setTimeout(() => {
            console.log("Ejecutado");
            element.nativeElement.focus();
            this.keyboard.show();
        }, 0);
    }

}