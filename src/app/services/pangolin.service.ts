import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInterface, PangolinInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PangolinService {

  constructor(private _httpClient: HttpClient) {}
  newPangolin(data: PangolinInterface): Observable<any>{
    const headers = new HttpHeaders()
    return this._httpClient.post("http://localhost:3001/pangolin/register", data, { headers })
  }

  login(data: LoginInterface): Observable<any>{
    const headers = new HttpHeaders()
    return this._httpClient.post("http://localhost:3001/pangolin/login", data, { headers })
  }

  getPangolin(id: string): Observable<any>{
    const headers = setHeader()
    return this._httpClient.get("http://localhost:3001/pangolin/one/" + id, { headers })
  }

  getOwnPangolin(): Observable<any>{
    const headers = setHeader()
    return this._httpClient.get("http://localhost:3001/pangolin/own", { headers })
  }
  getAllPangolins(): Observable<any>{
    const headers = setHeader()
    return this._httpClient.get("http://localhost:3001/pangolin/all", { headers })
  }

  deletePangolin(id: string): Observable<any>{
    const headers = setHeader()
    return this._httpClient.delete("http://localhost:3001/pangolin/delete/" + id, { headers})
  }

  updatePangolin(data: PangolinInterface): Observable<any>{
    const headers = setHeader()
    return this._httpClient.put("http://localhost:3001/pangolin/update/" + data._id, data, { headers })
  }

  checkAuth(): boolean{
    return localStorage.getItem('token') ? true : false
  }
}

const setHeader = (): HttpHeaders => {
  const token = localStorage.getItem("token");
  return new HttpHeaders({
    'Authorization': `Bearer ${token ? token : null}`,
  })
}
