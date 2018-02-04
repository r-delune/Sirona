import { TestBed, inject } from '@angular/core/testing';

import { DataInterpretorService } from './data-interpretor.service';

describe('DataInterpretorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataInterpretorService]
    });
  });

  it('should be created', inject([DataInterpretorService], (service: DataInterpretorService) => {
    expect(service).toBeTruthy();
  }));
});
