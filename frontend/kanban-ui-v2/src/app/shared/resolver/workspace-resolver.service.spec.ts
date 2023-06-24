import { TestBed } from '@angular/core/testing';

import { WorkspaceResolverService } from './workspace-resolver.service';

describe('WorkspaceResolverService', () => {
  let service: WorkspaceResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkspaceResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
