import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopHeadlines } from '../interfaces/news';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const apiDefaultCountry = environment.apiDefaultCountry;
const headers = new HttpHeaders({
	'X-Api-Key': apiKey
});

@Injectable({
	providedIn: 'root'
})
export class NewsService {
	country: string = apiDefaultCountry;

	headlinePage: number = 0;

	categorySelected: string;
	categoryPage: number = 0;

	constructor(private http: HttpClient) {}

	private exec<T>(query: string) {
		query = apiUrl + query;
		return this.http.get<T>(query, { headers });
	}

	getTopHeadline() {
		this.headlinePage++;
		return this.exec<TopHeadlines>(
			`/top-headlines?country=${this.country}&category=business&page=${this.headlinePage}`
		);
	}

	getTopHeadlineWithCategory(cat: string) {
		if (this.categorySelected === cat) this.categoryPage++;
		else {
			this.categoryPage = 1;
			this.categorySelected = cat;
		}
		return this.exec<TopHeadlines>(`/top-headlines?country=${this.country}&category=${cat}&page=${this.categoryPage}`);
	}
}
