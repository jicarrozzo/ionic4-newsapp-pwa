import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/news';

@Component({
	selector: 'app-news-group',
	templateUrl: './news-group.component.html',
	styleUrls: [ './news-group.component.scss' ]
})
export class NewsGroupComponent implements OnInit {
	@Input() newsgroup: Article[] = [];

	constructor() {}

	ngOnInit() {}
}
