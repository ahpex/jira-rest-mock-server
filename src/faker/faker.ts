import { Faker, faker } from "@faker-js/faker";
import { JiraModule } from "./modules/jira";

export class MyFaker extends Faker {
    public readonly jira: JiraModule = new JiraModule(this);

    constructor() {
        super(faker);
    }

    public baseUrl(): string {
        return "https://jira.example.com/rest/api/2";
    }
}
