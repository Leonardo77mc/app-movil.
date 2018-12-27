import { NgModule } from '@angular/core';
import { ParallaxHeaderDirective } from './parallax-header/parallax-header';
import { EnfocarDirective } from './enfocar/enfocar';
@NgModule({
	declarations: [ParallaxHeaderDirective,
    EnfocarDirective],
	imports: [],
	exports: [ParallaxHeaderDirective,
    EnfocarDirective]
})
export class DirectivesModule {}
