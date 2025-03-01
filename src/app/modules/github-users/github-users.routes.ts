import { Routes } from "@angular/router";
import { usersListResolver } from "./resolvers/users-list.resolver";
import { userDetailsResolver } from "./resolvers/user-details.resolver";

export const routes:Routes = [
    {
        path:'',
        redirectTo:'users',
        pathMatch:'full'
    },

    {
        path:'users',
        loadComponent: () => import('./pages/users-search/users-search.component').then(m => m.UsersSearchComponent),
        resolve:{
            usersList:usersListResolver
        }
    },

    {
        path:'users/:username',
        loadComponent: () => import('./pages/user-details/user-details.component').then(m => m.UserDetailsComponent),
        resolve:{
            usersList:userDetailsResolver
        }
    }
];