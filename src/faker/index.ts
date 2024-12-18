import { Faker, faker as fakerjs } from "@faker-js/faker";
import { JiraModule } from "./modules/jira";

export class JiraFaker extends Faker {
    public readonly jira: JiraModule = new JiraModule(this);

    constructor() {
        super(fakerjs);
    }

    public baseUrl(): string {
        return "https://127.0.0.1:6443/rest/api/2";
    }
}

const faker = new JiraFaker();

export { faker };
