import { AuditData } from 'app/admin/audits/audit-data.model';

export class Audit {
    constructor(public data: AuditData, public principal: string, public timestamp: string, public type: string) {}
}
