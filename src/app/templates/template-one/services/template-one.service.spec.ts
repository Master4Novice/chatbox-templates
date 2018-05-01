import { TestBed, inject } from '@angular/core/testing';

import { TemplateOneService } from './template-one.service';

describe('TemplateOneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemplateOneService]
    });
  });

  it('should be created', inject([TemplateOneService], (service: TemplateOneService) => {
    expect(service).toBeTruthy();
  }));
});
