import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_BASE_URL } from 'shared';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const apiBaseUrl = inject(API_BASE_URL);

  // Não altera URLs absolutas
  if (/^https?:\/\//i.test(req.url)) {
    return next(req);
  }

  // Garante que a URL relativa comece com /
  const normalizedUrl = req.url.startsWith('/') ? req.url : `/${req.url}`;

  const apiReq = req.clone({
    url: `${apiBaseUrl}${normalizedUrl}`,
  });

  return next(apiReq);
};
