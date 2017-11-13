import { NgModule } from '@angular/core';
import { SafehtmlPipe } from './../pipes/safehtml/safehtml';
import { StriphtmlPipe } from './../pipes/striphtml/striphtml';

@NgModule({
	declarations: [SafehtmlPipe, StriphtmlPipe],
	imports: [],
	exports: [SafehtmlPipe, StriphtmlPipe]
})
export class PipesModule {}
