import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { HttpService } from './http.service';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MateriService {

    constructor(
        private httpService: HttpService) {
    }

    getClass() {
        return this.httpService.get('materi', 'class').pipe(map(res => res));
    }

    postMateri(data: any) {
        return this.httpService.post('materi', 'lesson', data).pipe(map(res => res));
    }

    putMateri(id: any, data: any) {
        return this.httpService.put('materi', 'lesson/'+id, data).pipe(map(res => res));
    }

    deleteMateri(id: any) {
        return this.httpService.delete('materi', 'lesson/'+id).pipe(map(res => res));
    }

    getAllMateri() {
        return this.httpService.get('materi', 'lesson').pipe(map(res => res));
    }

    getMateriDetail(id: any){
        return this.httpService.get('materi', 'lesson/'+id).pipe(map(res => res));
    }

    getSubMateriDetail(id: any){
        return this.httpService.get('materi', 'sublesson/'+id).pipe(map(res => res));
    }

    postSubMateri(body: any){
        return this.httpService.post('materi', 'sublesson', body).pipe(map(res => res));
    }

    putSubMateri(id: any, body: any){
        return this.httpService.put('materi', 'sublesson/'+id, body).pipe(map(res => res));
    }

    deleteSubMateri(id: any) {
        return this.httpService.delete('materi', 'sublesson/'+id).pipe(map(res => res));
    }

    postQuiz(body: any) {
        return this.httpService.post('materi', 'quiz', body).pipe(map(res => res));
    }

    getDetailQuiz(id: any){
        return this.httpService.get('materi', 'quiz/'+id).pipe(map(res => res));
    }

    putEditQuiz(body: any, id: any){
        return this.httpService.put('materi', 'quiz/'+id, body).pipe(map(res => res));
    }

    deleteQuiz(id: any){
        return this.httpService.delete('materi', 'quiz/'+id).pipe(map(res => res));
    }

}