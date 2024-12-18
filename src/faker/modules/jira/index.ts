import type { JiraFaker } from "../..";
import issue_summary from "./issue_summary";

export type Issue = {
    expand: string;
    id: string;
    self: string;
    key: string;
    fields: {
        creator: Person;
        summary: string;
        [key: string]: any;
    };
};

type AvatarUrls = {
    "48x48": string;
    "24x24": string;
    "16x16": string;
    "32x32": string;
};

type Person = {
    self: string;
    name: string;
    key: string;
    emailAddress: string;
    avatarUrls: AvatarUrls;
    displayName: string;
    active: boolean;
    timeZone: string;
};

type SearchResult = {
    expand: string;
    startAt: number;
    maxResults: number;
    total: number;
    issues: SearchResultIssue[];
};

type SearchResultIssue = {
    expand: string;
    id: string;
    self: string;
    key: string;
    fields: {
        summary: string;
    };
};

export class JiraModule {
    constructor(protected readonly faker: JiraFaker) {}

    issue(
        options: {
            /**
             * The issue key
             *
             * @default faker.jira.key()
             */
            key?: string;
        } = {},
    ): Issue {
        const { key } = options;

        return {
            expand: "renderedFields,names,schema,operations,editmeta,changelog,versionedRepresentations",
            id: this.faker.datatype.number({ min: 10000, max: 99999 }).toString(),
            self: this.faker.internet.url(),
            key: key || this.key(),
            fields: {
                summary: this.summary(),
                aggregatetimespent: this.timespentSeconds,
                assignee: this.person(),
                components: [],
                created: this.faker.date.past().toISOString(),
                creator: this.person(),
                description: this.faker.lorem.paragraphs(),
                fixVersions: [
                    {
                        self: this.faker.internet.url(),
                        id: this.faker.datatype.uuid(),
                        description: this.faker.lorem.sentence(),
                        name: `V${this.faker.datatype.number({ min: 1, max: 5 })}.${this.faker.datatype.number({
                            min: 0,
                            max: 9,
                        })}.${this.faker.datatype.number({ min: 0, max: 9 })}`,
                        archived: this.faker.datatype.boolean(),
                        released: this.faker.datatype.boolean(),
                        releaseDate: this.faker.date.past().toISOString().split("T")[0],
                    },
                ],
                issuetype: {
                    self: this.faker.internet.url(),
                    id: this.faker.datatype.uuid(),
                    description: this.faker.lorem.sentence(),
                    iconUrl: this.faker.internet.url(),
                    name: this.issuetype(),
                    subtask: this.faker.datatype.boolean(),
                },
                issuelinks: [
                    {
                        id: this.faker.datatype.uuid(),
                        self: this.faker.internet.url(),
                        type: {
                            id: this.faker.datatype.uuid(),
                            name: this.faker.lorem.word(),
                            inward: this.faker.lorem.word(),
                            outward: this.faker.lorem.word(),
                            self: this.faker.internet.url(),
                        },
                        inwardIssue: {
                            id: this.faker.datatype.uuid(),
                            key: `ABC-${this.faker.datatype.number({ min: 10000, max: 99999 })}`,
                            self: this.faker.internet.url(),
                            fields: {
                                summary: this.faker.lorem.sentence(),
                                status: {
                                    self: this.faker.internet.url(),
                                    description: this.faker.lorem.sentence(),
                                    iconUrl: this.faker.internet.url(),
                                    name: this.faker.lorem.word(),
                                    id: this.faker.datatype.uuid(),
                                    statusCategory: {
                                        self: this.faker.internet.url(),
                                        id: this.faker.datatype.uuid(),
                                        key: this.faker.lorem.word(),
                                        colorName: this.faker.color.human(),
                                        name: this.faker.lorem.word(),
                                    },
                                },
                                priority: {
                                    self: this.faker.internet.url(),
                                    iconUrl: this.faker.internet.url(),
                                    name: this.faker.lorem.word(),
                                    id: this.faker.datatype.uuid(),
                                },
                                issuetype: {
                                    self: this.faker.internet.url(),
                                    id: this.faker.datatype.uuid(),
                                    description: this.faker.lorem.sentence(),
                                    iconUrl: this.faker.internet.url(),
                                    name: this.faker.lorem.word(),
                                    subtask: this.faker.datatype.boolean(),
                                    avatarId: this.faker.datatype.uuid(),
                                },
                            },
                        },
                    },
                ],
                labels: this.faker.helpers.arrayElements(["Team A", "Team B", "Team C", "Team D"]),
                lastViewed: null,
                priority: {
                    self: this.faker.internet.url(),
                    iconUrl: this.faker.internet.url(),
                    name: this.priority(),
                    id: this.faker.datatype.uuid(),
                },
                project: {
                    self: this.faker.internet.url(),
                    id: this.faker.datatype.uuid(),
                    key: "ABC",
                    name: this.faker.company.name(),
                    projectTypeKey: "software",
                    avatarUrls: {
                        "48x48": this.faker.internet.avatar(),
                        "24x24": this.faker.internet.avatar(),
                        "16x16": this.faker.internet.avatar(),
                        "32x32": this.faker.internet.avatar(),
                    },
                },
                resolution: {
                    self: this.faker.internet.url(),
                    id: this.faker.datatype.uuid(),
                    description: this.faker.lorem.sentence(),
                    name: this.faker.lorem.word(),
                },
                resolutiondate: this.faker.date.past().toISOString(),
                status: {
                    self: this.faker.internet.url(),
                    description: this.faker.lorem.sentence(),
                    iconUrl: this.faker.internet.url(),
                    name: this.faker.lorem.word(),
                    id: this.faker.datatype.uuid(),
                    statusCategory: {
                        self: this.faker.internet.url(),
                        id: this.faker.datatype.uuid(),
                        key: this.faker.lorem.word(),
                        colorName: this.faker.color.human(),
                        name: this.faker.lorem.word(),
                    },
                },
                timeestimate: this.faker.datatype.number(),
                timeoriginalestimate: this.faker.datatype.number(),
                timetracking: {
                    originalEstimate: `${this.faker.datatype.number({ min: 1, max: 10 })}d`,
                    remainingEstimate: `${this.faker.datatype.number({ min: 0, max: 10 })}m`,
                    timeSpent: `${this.faker.datatype.number({ min: 1, max: 10 })}d ${this.faker.datatype.number({
                        min: 0,
                        max: 23,
                    })}h ${this.faker.datatype.number({ min: 0, max: 59 })}m`,
                    originalEstimateSeconds: this.timespentSeconds(),
                    remainingEstimateSeconds: this.timespentSeconds(),
                    timeSpentSeconds: this.timespentSeconds(),
                },
                timespent: this.timespentSeconds(),
                updated: this.faker.date.recent().toISOString(),
                versions: [],
                watches: {
                    self: this.faker.internet.url(),
                    watchCount: this.faker.datatype.number({ min: 0, max: 10 }),
                    isWatching: this.faker.datatype.boolean(),
                },
            },
        };
    }

    person(): Person {
        const firstName = this.faker.name.firstName();
        const lastName = this.faker.name.lastName();

        return {
            self: `${this.faker.baseUrl()}/user?username=${firstName}.${lastName}`,
            name: `${firstName}${lastName[0]}`,
            key: `${firstName}${lastName[0]}`.toLowerCase(),
            emailAddress: this.faker.internet.email(firstName, lastName),
            avatarUrls: this.avatarUrls(),
            displayName: `${lastName}, ${firstName}`,
            active: this.faker.datatype.boolean(),
            timeZone: this.faker.address.timeZone(),
        };
    }

    key(): string {
        return `ABC-${this.faker.datatype.number({ min: 10000, max: 99999 })}`;
    }

    issuetype(): string {
        return this.faker.helpers.arrayElement(["Concept", "Bug", "Task", "Story", "Epic"]);
    }

    priority(): string {
        return this.faker.helpers.arrayElement(["Low", "Medium", "High"]);
    }

    avatarUrls(): AvatarUrls {
        const url = "http://avatar.example.com";

        return {
            "16x16": `${url}/avatar.png`,
            "24x24": `${url}/avatar.png`,
            "32x32": `${url}/avatar.png`,
            "48x48": `${url}/avatar.png`,
        };
    }

    search(
        options: {
            /**
             * Number of issues to return
             *
             * @default 20
             */
            total?: number;
        } = {},
    ): SearchResult {
        const { total = 20 } = options;

        return {
            expand: "names,schema",
            startAt: 0,
            maxResults: 50,
            total,
            issues: Array.from({ length: total }, () => this.searchResult()),
        };
    }

    searchResult(): SearchResultIssue {
        const id = this.faker.datatype.number({ min: 10000, max: 99999 });

        return {
            expand: "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            id: `${id}`,
            self: `${this.faker.baseUrl()}/issue/${id}`,
            key: this.key(),
            fields: {
                summary: this.summary(),
            },
        };
    }

    summary(): string {
        const task = this.faker.helpers.arrayElement(issue_summary.task);
        const what = this.faker.helpers.arrayElement(issue_summary.what);
        const where = this.faker.helpers.arrayElement(issue_summary.where);

        return `${task} ${what} ${where}`;
    }

    timespentSeconds(
        options:
            | number
            | {
                  weeks?: number;
                  days?: number;
                  hours?: number;
                  minutes?: number;
              } = { weeks: 0, days: 0, hours: 0, minutes: 0 },
    ): string {
        if (typeof options === "number") {
            return `${options}`;
        }

        const weeks = options.weeks || this.faker.datatype.number({ min: 0, max: 1 });
        const days = options.days || this.faker.datatype.number({ min: 0, max: 2 });
        const hours = options.hours || this.faker.datatype.number({ min: 0, max: 7 });
        const minutes = options.minutes || this.faker.datatype.number({ min: 0, max: 60 });
        const mult = 7;

        return `${weeks * mult * 60 * 60 + days * 60 * 60 + hours * 60 * 60 + minutes * 60}`;
    }
}
