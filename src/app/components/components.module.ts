import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsGroupComponent } from './news-group/news-group.component';
import { NewsComponent } from './news/news.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
	declarations: [ NewsGroupComponent, NewsComponent ],
	imports: [ CommonModule, IonicModule ],
	exports: [ NewsGroupComponent ]
})
export class ComponentsModule {}
