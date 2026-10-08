import {Locator, Page} from '@playwright/test';

export enum MenuOptions {
    Admin = 'Admin',
    PIM = 'PIM',
    Leave = 'Leave',
    Time = 'Time',
    Recruitment = 'Recruitment',
    MyInfo = 'My Info',
    Performance = 'Performance',
    Dashboard = 'Dashboard',
    Directory = 'Directory',
    Maintenance = 'Maintenance',
    Claim = 'Claim',
    Buzz = 'Buzz'
}

export class SidePanel {

    readonly page: Page;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = this.page.getByRole('textbox', { name: 'Search' });
    }

    private getMenuOptions(option: MenuOptions):Locator {
        return this.page.getByRole('link', { name: option });
    }

    async clickMenuOption(option: MenuOptions) {
        await this.getMenuOptions(option).click();
    }

   async searchMenuOption(option: MenuOptions) {
        await this.searchInput.fill(option);
    }

}