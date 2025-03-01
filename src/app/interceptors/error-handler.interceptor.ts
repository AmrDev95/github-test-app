import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { LoadingService } from '../services/loading/loading.service';
import { NotificationService } from '../services/notification/notification.service';
import { DialogType } from '../services/notification/dialog.type';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
    
  const loadingService = inject(LoadingService);
  const notificationService = inject(NotificationService);



  loadingService.controlPageLoading(req.url, true);

  return next(req).pipe(
    finalize(() => {
      loadingService.controlPageLoading(req.url, false);
    }),
    catchError((error: HttpErrorResponse) => {
      notificationService.openToastr(DialogType.failure, error.error?.message ?? 'Unknown error occured, please contact us for more information');
      return throwError(() => error);
    })
  );
};