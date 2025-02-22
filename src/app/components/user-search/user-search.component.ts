import { GithubService } from './../../services/github.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-search',
  standalone: false,
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css'
})
export class UserSearchComponent {
  username = '';
  user : any = null;
  repos : any[] = [];
  error = '';

  constructor(private githubService : GithubService){}

  searchUser(){
    this.githubService.getUserDetails(this.username).subscribe(
      (data)=>{
        this.user = data;
        this.error = '';
        this.getRecentRepos();
        
      },
      (err)=>{
        this.error = 'User Not Found';
        this.user = null;
        this.repos = [];
      }
    );
  }

  getRecentRepos(){
    this.githubService.getUserRepos(this.username).subscribe(
      (data)=>{
        this.repos = data.slice(0,3);
      }
    )
  }
}



