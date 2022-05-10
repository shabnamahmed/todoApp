import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public list: any = [];
  public user: any = [];
  constructor() { }

  saveList(data: any) {
    this.list = [];
    this.list.push(data);
    console.log(this.list);
  }

  getList() {
    return this.list;
  }


  getUser() {
    return this.user;
  }

  setUserList(data: any) {
    this.user = [];
    this.user.push(data);
    console.log(this.user)
  }
}
