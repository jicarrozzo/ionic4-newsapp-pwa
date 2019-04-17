import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { Article } from '../../interfaces/news';

@Component({
	selector: 'app-tab3',
	templateUrl: 'tab3.page.html',
	styleUrls: [ 'tab3.page.scss' ]
})
export class Tab3Page implements OnInit {
	slidesOpts = {
		allowSlidePrev: false,
		allowSlideNext: false
	};

	//favorites: Article[] = [];
	constructor(public datalocalService: DataLocalService) {}
	ngOnInit(): void {
		console.log(this.datalocalService.newsFavorites.length);
	}

	ionViewDidEnter() {
		//this.favorites = this.datalocalService.newsFavorites;
	}
}
