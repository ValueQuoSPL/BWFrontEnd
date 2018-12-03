import { FooterpageModule } from './footerpage.module';

describe('FooterpageModule', () => {
    let footerpageModule: FooterpageModule;

    beforeEach(() => {
        footerpageModule = new FooterpageModule();
    });

    it('should create an instance', () => {
        expect(footerpageModule).toBeTruthy();
    });
});
