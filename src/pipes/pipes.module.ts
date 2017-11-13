import { NgModule } from '@angular/core';
import { SafehtmlPipe } from './../pipes/safehtml/safehtml';
@NgModule({
	declarations: [SafehtmlPipe],
	imports: [],
	exports: [SafehtmlPipe]
})
export class PipesModule {}
