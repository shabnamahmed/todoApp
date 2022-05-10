import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { TodoService } from 'src/app/services/todo.service';
@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.css']
})
export class TodoListPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  userId: any;
  form!: FormGroup;
  userName: any;
  term: any;
  sortValue: any;
  ngOnInit(): void {
    this.userId = this.route.snapshot.params['uid'];

    this.form = new FormGroup({
      taskName: new FormControl("", [Validators.required]),
      taskStatus: new FormControl(''),
      description: new FormControl(''),
      id: new FormControl(''),
      userId: new FormControl(''),

    });
    this.getUser();
    this.getItems();
  }
  items: any = [];
  status = ['ToDo', 'In-Progress', 'Done'];
  sort = ['Name', 'Status'];
  selectedStatus: any;
  /* A two-way binding performed which
     pushes text on division */
  taskName: any = '';
  description: any;
  id: any;
  edit = false;
  /* When input is empty, it will
     not create a new division */
  public addToList() {
    let temp = JSON.parse(localStorage.getItem('list') || '[]');
    console.log(temp);
    if (this.taskName == '') {
    }
    else {

      let formValue = this.form.controls['taskStatus'].value;
      if (formValue == '' || formValue == null || formValue == undefined) {
        formValue = 'ToDo'
      }

      if (temp == undefined || temp.length == 0 || temp == []) {
        this.items.push({
          id: this.items.length, name: this.taskName,
          description: this.description, status: formValue, userId: this.userId
        });
        localStorage.setItem('list', JSON.stringify(this.items));

        this.edit = false;
      }
      else if (temp.length > 0) {
        this.items = temp;
        this.items.push({
          id: this.items.length, name: this.taskName,
          description: this.description, status: formValue
          , userId: this.userId
        });
        localStorage.setItem('list', JSON.stringify(this.items));
        this.edit = false;
      }

      this.taskName = '';
      this.description = '';
    }
    this.getItems();
  }
  getId() {
    var e = (document.getElementById("status")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    console.log(sel);
    var opt = e.options[sel];
    console.log(opt.value)
    this.selectedStatus = opt.value;

  }

  getSortValue() {
    var e = (document.getElementById("sortData")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    console.log(sel);
    var opt = e.options[sel];
    console.log(opt.value.toLowerCase())
    this.sortValue = opt.value.toLowerCase();
    let temp = opt.value.toLowerCase();
    this.items = _.chain(this.items).sortBy(temp).value();

    console.log(this.items);
  }
  hideStatus() {
    this.edit = false;
  }
  get f() {

    if (this.selectedStatus == '' || this.selectedStatus == null) {
      this.form.controls['taskStatus'].setValue("ToDo");
    }

    return this.form.controls;
  }

  /* This function takes to input the
     task, that has to be deleted*/
  public deleteTask(item: any) {
    console.log(item);
    for (let [index, p] of this.items.entries()) {
      if (p.id === item.id) {
        this.items.splice(index, 1);
        localStorage.setItem('list', JSON.stringify(this.items));
      }
    }
  }
  editTask(item: any) {
    this.edit = true;
    this.taskName = item.name;
    this.description = item.description;
    this.id = item.id;
    this.selectedStatus = item.status;
    this.form.controls['taskStatus'].patchValue(this.selectedStatus);
    console.log(this.selectedStatus)


  }


  getItems() {
    let temp = JSON.parse(localStorage.getItem('list') || '[]');
    this.items = [];
    temp.forEach((element: any) => {
      if (JSON.parse(element.userId) === JSON.parse(this.userId))
        this.items.push(element);
    })
  }
  Edit(id: any) {
    this.edit = false;
    this.items.forEach((element: any) => {
      if (id == element.id) {
        element.name = this.taskName;
        element.description = this.description;
        element.status = this.selectedStatus;
      }
    });
    localStorage.setItem('list', JSON.stringify(this.items));
  }

  getUser() {
    let temp = JSON.parse(localStorage.getItem('register') || '[]');
    temp.forEach((element: any) => {
      if (this.userId == element.id) {
        this.userName = element.username;
      }
    })
  }
  search() {
    if (this.term != '') {

      let data = JSON.parse(localStorage.getItem('list') || '[]');
      console.log(data);
      let obj: any = [] = new Set();
      data.forEach((res: any) => {
        var parts = res.name.split(' ');
        console.log(parts);
        parts.push(res.name);
        parts.forEach((element: any) => {
          if (element.toLowerCase().startsWith(this.term.toLowerCase())
            || res.status.toLowerCase().startsWith(this.term.toLowerCase())) {
            obj.add(res);
          }
        });
        this.items = [];
        this.items = Array.from(obj);
      });

    }
    else if (this.term == '') {
      this.ngOnInit();
    }
  }

}

