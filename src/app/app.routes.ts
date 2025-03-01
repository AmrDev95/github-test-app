import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren: () => import('../app/modules/github-users/github-users.routes').then(m => m.routes)
    }
];
