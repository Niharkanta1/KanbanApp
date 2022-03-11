import { Injectable, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommonService implements OnInit {
    private workspaceSelect = new Subject<number>();

    ngOnInit(): void {
    }

    setSelectedWorkspaceId(id: number) {
        console.log("CommonService::Setting selected workspace Id::", id);
        this.workspaceSelect.next(id);
    }

    getSelectedWorkspaceId(): Observable<number> {
        return this.workspaceSelect.asObservable();
    }

}