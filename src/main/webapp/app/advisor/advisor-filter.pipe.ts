import { PipeTransform, Pipe } from '../../../../../node_modules/@angular/core';

@Pipe({
    name: 'paymentFilter'
})
export class AdvisorFilterPipe implements PipeTransform {
    transform(payment: any = [], searchName: string) {
        if (!payment || !searchName) {
            return payment;
        }

        return payment.filter(payments => payments.status.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
    }
}
