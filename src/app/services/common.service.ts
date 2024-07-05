import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usermodel } from '../models/user.model';
import { Observable } from 'rxjs';
import { groupmodel } from '../models/group.model';
import { expensesmodel } from '../models/expenses.model';
import { groupmembersmodel } from '../models/groupmember.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiUrl = 'api/'

  constructor(private http: HttpClient) { }

  getAllUser() {
    return this.http.get<usermodel[]>(this.apiUrl + 'users/')
  }

  createUser(userDetail: usermodel){
    return this.http.post(this.apiUrl + 'users/', userDetail)
  }

  updateUser(userDetail: usermodel) {
    return this.http.put(this.apiUrl + 'users/' + userDetail.id, userDetail);
  }

  authentication(email: any, password: any){
    return this.http.get (this.apiUrl + 'users/email/' + email + '/password/' + password)
  }

  getAllGroup() {
    return this.http.get<groupmodel[]>(this.apiUrl + 'groups/')
  }
  
  createGroup(groupDetail: groupmodel){
    return this.http.post(this.apiUrl + 'groups/', groupDetail)
  }

  UpdateGroup(groupDetail: groupmodel) {
    return this.http.put(this.apiUrl + 'groups/' + groupDetail.id, groupDetail);
  }

  getGroup(id: groupmodel) {
    return this.http.get(this.apiUrl + 'groups/' + id);
  }

  updateExpense(expenseDetail: expensesmodel) {
    return this.http.put(this.apiUrl + 'expenses/' + expenseDetail.id, expenseDetail);
  }

  createExpense(expenseDetail: expensesmodel) {
    return this.http.post(this.apiUrl + 'expenses/', expenseDetail);
  }

  deleteExpense(expencesId: number) {
    return this.http.delete(this.apiUrl + 'expenses/' + expencesId);
  }

  getAllExpenses() {
    return this.http.get<expensesmodel[]>(this.apiUrl + 'expenses/')
  }

  getAllMembers() {
    return this.http.get<groupmembersmodel[]>(this.apiUrl + 'groupMembers/')
  }

  createMember(memberDetail: groupmembersmodel){
    return this.http.post(this.apiUrl + 'groupMembers/', memberDetail)
  }
}
