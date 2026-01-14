import { Injectable } from "@angular/core";
import { BehaviorSubject, defer, Observable } from "rxjs";
import { WorkspacesGateway } from "@domain/gateways/workspaces.gateway";
import { Workspaces } from "@domain/models/kanban-workspaces.model";

@Injectable({
    providedIn: "root",
})
export class InMemoryWorkspacesKanban implements WorkspacesGateway {
    private readonly _fullWorkspaces = [
        {
            id: "09e70007-8630-4948-a234-d8d020c5de6e",
            name: "Bernard GIE",
            createdAt: "2026-01-11 15:21:41.806+00",
            updatedAt: null,
            columns: [
                {
                    id: "6629282b-5657-419d-bb1c-cc967e81b91c",
                    name: "À faire",
                    workspaceId: "09e70007-8630-4948-a234-d8d020c5de6e",
                    position: 0,
                    createdAt: "2026-01-11T15:21:41.885+00:00",
                    updatedAt: null,
                    tasks: [
                        {
                            id: "1c9e7293-1d8d-4ec5-ada6-7389e5954327",
                            title: "Sit ut labore esse nobis. - À faire #1",
                            description:
                                "Distinctio blanditiis quibusdam. Atque labore expedita magni accusantium ab exercitationem tempora perspiciatis nemo.",
                            status: "todo",
                            columnId: "6629282b-5657-419d-bb1c-cc967e81b91c",
                            order: 0,
                            createdAt: "2026-01-11T15:21:41.94167",
                            updatedAt: null,
                        },
                        {
                            id: "a316aa82-aaf0-4746-bce4-c8b54475049e",
                            title: "Ex ea aliquid enim numquam libero. - À faire #2",
                            description:
                                "Modi dignissimos consequuntur. Neque laudantium nihil enim hic. Aperiam aperiam cumque mollitia ex modi eum.",
                            status: "todo",
                            columnId: "6629282b-5657-419d-bb1c-cc967e81b91c",
                            order: 1,
                            createdAt: "2026-01-11T15:21:41.972105",
                            updatedAt: null,
                        },
                        {
                            id: "e4adef33-0787-4d23-8f8c-624a6f7232a0",
                            title: "Pariatur asperiores harum dicta. - À faire #3",
                            description:
                                "Quo esse corrupti laboriosam quae vel. Facilis illo ullam voluptatem id voluptatibus quibusdam id. Omnis nostrum dignissimos incidunt soluta fuga aliquam iure facilis.",
                            status: "todo",
                            columnId: "6629282b-5657-419d-bb1c-cc967e81b91c",
                            order: 2,
                            createdAt: "2026-01-11T15:21:41.990079",
                            updatedAt: null,
                        },
                        {
                            id: "2e53e0ae-0787-458d-b38f-24f94f90eae6",
                            title: "In impedit eveniet error. - À faire #4",
                            description: "Nisi alias quam. Labore nostrum rerum laudantium praesentium id.",
                            status: "todo",
                            columnId: "6629282b-5657-419d-bb1c-cc967e81b91c",
                            order: 3,
                            createdAt: "2026-01-11T15:21:42.006447",
                            updatedAt: null,
                        },
                        {
                            id: "e85877cf-4dce-4ac3-9641-d68786df34de",
                            title: "Illum distinctio nulla iste iure rerum. - À faire #5",
                            description:
                                "Laborum quae exercitationem nisi iste. Explicabo itaque nam dolorem illo. Totam itaque et voluptatibus esse.",
                            status: "todo",
                            columnId: "6629282b-5657-419d-bb1c-cc967e81b91c",
                            order: 4,
                            createdAt: "2026-01-11T15:21:42.022741",
                            updatedAt: null,
                        },
                        {
                            id: "a8908779-1cf6-4d6b-ac66-a0cb83452a18",
                            title: "Aspernatur deleniti consectetur id commodi repellendus ipsam ipsum. - À faire #6",
                            description:
                                "Recusandae repellat distinctio assumenda eveniet laudantium veniam dolorem sed similique. Itaque veniam illum sed.",
                            status: "todo",
                            columnId: "6629282b-5657-419d-bb1c-cc967e81b91c",
                            order: 5,
                            createdAt: "2026-01-11T15:21:42.03986",
                            updatedAt: null,
                        },
                        {
                            id: "095435c7-e01f-44c8-86dc-957564af3a22",
                            title: "Eaque voluptate dolorem reprehenderit voluptatem tempore fuga. - À faire #7",
                            description:
                                "Cupiditate reprehenderit alias occaecati. Assumenda ipsum eius veniam minus asperiores. Eaque accusantium sint est nam.",
                            status: "todo",
                            columnId: "6629282b-5657-419d-bb1c-cc967e81b91c",
                            order: 6,
                            createdAt: "2026-01-11T15:21:42.056155",
                            updatedAt: null,
                        },
                        {
                            id: "454dd8a1-4aca-40dd-893e-233b42e04dd2",
                            title: "Dolorem omnis quos optio accusamus ducimus totam pariatur. - À faire #8",
                            description: "In voluptatem vitae et vitae ratione perspiciatis dolore harum officia.",
                            status: "todo",
                            columnId: "6629282b-5657-419d-bb1c-cc967e81b91c",
                            order: 7,
                            createdAt: "2026-01-11T15:21:42.072562",
                            updatedAt: null,
                        },
                    ],
                },
                {
                    id: "cc71c2fc-cd57-41a4-9838-974664caf776",
                    name: "En cours",
                    workspaceId: "09e70007-8630-4948-a234-d8d020c5de6e",
                    position: 1,
                    createdAt: "2026-01-11T15:21:41.905+00:00",
                    updatedAt: null,
                    tasks: [
                        {
                            id: "289c0897-7630-4246-a4e8-6093e41c599b",
                            title: "Id occaecati atque saepe soluta labore assumenda repellendus. - En cours #1",
                            description:
                                "Inventore quod atque placeat numquam quam saepe. Necessitatibus voluptates tenetur.",
                            status: "in_progress",
                            columnId: "cc71c2fc-cd57-41a4-9838-974664caf776",
                            order: 0,
                            createdAt: "2026-01-11T15:21:42.089053",
                            updatedAt: null,
                        },
                        {
                            id: "3af931b8-fe1a-425e-994e-0b854e960941",
                            title: "Nemo commodi illum soluta eaque. - En cours #2",
                            description:
                                "Repellat excepturi provident vel et quos soluta. Corporis inventore aperiam ab.",
                            status: "in_progress",
                            columnId: "cc71c2fc-cd57-41a4-9838-974664caf776",
                            order: 1,
                            createdAt: "2026-01-11T15:21:42.105096",
                            updatedAt: null,
                        },
                        {
                            id: "2f6ffd7a-d6a1-497c-8b43-88eadcaac33c",
                            title: "Inventore omnis cum. - En cours #3",
                            description:
                                "Sint aperiam accusamus natus voluptatibus. Et odio qui. Voluptas tempore a repudiandae accusantium.",
                            status: "in_progress",
                            columnId: "cc71c2fc-cd57-41a4-9838-974664caf776",
                            order: 2,
                            createdAt: "2026-01-11T15:21:42.120675",
                            updatedAt: null,
                        },
                    ],
                },
                {
                    id: "7fe507d5-d565-4bd1-986b-fb91abad6322",
                    name: "Terminé",
                    workspaceId: "09e70007-8630-4948-a234-d8d020c5de6e",
                    position: 2,
                    createdAt: "2026-01-11T15:21:41.921+00:00",
                    updatedAt: null,
                    tasks: [
                        {
                            id: "79d80a44-14a0-41d0-9ee9-f055ed9f32f9",
                            title: "Unde nemo sequi deleniti. - Terminé #1",
                            description:
                                "Sed ipsa omnis. Exercitationem cumque odio voluptate repellendus reprehenderit aut. Quibusdam impedit velit.",
                            status: "done",
                            columnId: "7fe507d5-d565-4bd1-986b-fb91abad6322",
                            order: 0,
                            createdAt: "2026-01-11T15:21:42.136926",
                            updatedAt: null,
                        },
                        {
                            id: "cb04c933-0cb0-4372-b033-7abd547b28e8",
                            title: "Corrupti alias quam doloremque ad deserunt sunt. - Terminé #2",
                            description:
                                "Harum laboriosam commodi corrupti. Perspiciatis deserunt hic dolor. Numquam officia fugiat quidem doloribus tempore.",
                            status: "done",
                            columnId: "7fe507d5-d565-4bd1-986b-fb91abad6322",
                            order: 1,
                            createdAt: "2026-01-11T15:21:42.153512",
                            updatedAt: null,
                        },
                    ],
                },
            ],
        },
        {
            id: "1ad0d56c-73ef-4b5b-89bb-42e17028a6b9",
            name: "Leclerc SCS",
            createdAt: "2026-01-12 18:14:06.478+00",
            updatedAt: null,
            columns: [
                {
                    id: "454e9c59-1e3e-41a5-9029-dc4a7831596e",
                    name: "À faire",
                    workspaceId: "1ad0d56c-73ef-4b5b-89bb-42e17028a6b9",
                    position: 0,
                    createdAt: "2026-01-12T18:14:06.539+00:00",
                    updatedAt: null,
                    tasks: [
                        {
                            id: "b3ff273a-9a0b-45f4-9291-01c25c281923",
                            title: "Maxime labore necessitatibus similique sed neque. - À faire #1",
                            description:
                                "Eum aperiam dolores quia occaecati repellendus blanditiis quibusdam. Id numquam reiciendis aliquam fugit molestias nobis molestias alias.",
                            status: "todo",
                            columnId: "454e9c59-1e3e-41a5-9029-dc4a7831596e",
                            order: 0,
                            createdAt: "2026-01-12T18:14:06.595089",
                            updatedAt: null,
                        },
                        {
                            id: "65b2ea35-affa-4282-9c8d-2cb9780b096d",
                            title: "Mollitia explicabo consequatur inventore. - À faire #2",
                            description:
                                "Excepturi dolores mollitia et quasi tenetur sequi provident consectetur libero. Occaecati laboriosam incidunt velit sapiente.",
                            status: "todo",
                            columnId: "454e9c59-1e3e-41a5-9029-dc4a7831596e",
                            order: 1,
                            createdAt: "2026-01-12T18:14:06.622186",
                            updatedAt: null,
                        },
                        {
                            id: "9d96c0b5-0616-427e-a671-5a0c8b18589e",
                            title: "Optio nihil expedita sint sit quos ipsa quibusdam. - À faire #3",
                            description:
                                "Exercitationem rem accusamus eum dolores deserunt. Atque natus ab rem explicabo fugit et odio. Iste perferendis voluptatibus dolorum.",
                            status: "todo",
                            columnId: "454e9c59-1e3e-41a5-9029-dc4a7831596e",
                            order: 2,
                            createdAt: "2026-01-12T18:14:06.638124",
                            updatedAt: null,
                        },
                        {
                            id: "051bd250-fe59-4490-b978-ebc996196bd2",
                            title: "Reprehenderit nulla eaque aperiam. - À faire #4",
                            description:
                                "Minima tempora at ex vel dicta exercitationem. Veniam aperiam earum nobis et voluptate delectus. Illum officia voluptatibus quos corporis optio.",
                            status: "todo",
                            columnId: "454e9c59-1e3e-41a5-9029-dc4a7831596e",
                            order: 3,
                            createdAt: "2026-01-12T18:14:06.654653",
                            updatedAt: null,
                        },
                        {
                            id: "76999042-a1d3-4599-ac9d-0980530d0b06",
                            title: "Est unde tenetur optio facilis magni. - À faire #5",
                            description:
                                "Modi porro possimus molestias veniam eveniet sed. Minima repudiandae occaecati accusantium dolorum quasi sit perferendis. Facilis magni facere consequatur aperiam fugiat reprehenderit officiis ipsa.",
                            status: "todo",
                            columnId: "454e9c59-1e3e-41a5-9029-dc4a7831596e",
                            order: 4,
                            createdAt: "2026-01-12T18:14:06.671203",
                            updatedAt: null,
                        },
                        {
                            id: "f31bdfc5-6e96-4c5b-b101-fbdebf4f87c9",
                            title: "Necessitatibus hic aliquid ipsum voluptatibus saepe esse. - À faire #6",
                            description:
                                "Praesentium nemo distinctio recusandae odio aliquid odio esse. A quibusdam deserunt itaque vitae molestias minima.",
                            status: "todo",
                            columnId: "454e9c59-1e3e-41a5-9029-dc4a7831596e",
                            order: 5,
                            createdAt: "2026-01-12T18:14:06.688151",
                            updatedAt: null,
                        },
                        {
                            id: "6abd7212-c552-476a-8d91-213e8c60a471",
                            title: "Alias tenetur culpa blanditiis. - À faire #7",
                            description:
                                "Dicta earum consequatur tempore tempore. Dicta exercitationem error ad nemo placeat sapiente est quo nesciunt.",
                            status: "todo",
                            columnId: "454e9c59-1e3e-41a5-9029-dc4a7831596e",
                            order: 6,
                            createdAt: "2026-01-12T18:14:06.704479",
                            updatedAt: null,
                        },
                        {
                            id: "3cda64f7-056e-4e81-bdcf-ba9fbf841a05",
                            title: "Ad commodi corrupti iusto quasi repellendus optio. - À faire #8",
                            description:
                                "Pariatur dicta quas. Laboriosam dignissimos aliquid cum. Corrupti facere maiores debitis aspernatur.",
                            status: "todo",
                            columnId: "454e9c59-1e3e-41a5-9029-dc4a7831596e",
                            order: 7,
                            createdAt: "2026-01-12T18:14:06.720102",
                            updatedAt: null,
                        },
                    ],
                },
                {
                    id: "da0c7c03-da90-4e91-a254-3904e7e72554",
                    name: "En cours",
                    workspaceId: "1ad0d56c-73ef-4b5b-89bb-42e17028a6b9",
                    position: 1,
                    createdAt: "2026-01-12T18:14:06.562+00:00",
                    updatedAt: null,
                    tasks: [
                        {
                            id: "1e790cc2-71ca-403a-af29-31f3bc01b81e",
                            title: "Nulla commodi consequuntur ea nesciunt quam ipsam repudiandae. - En cours #1",
                            description: "Eius maxime sed nobis quasi quae.",
                            status: "in_progress",
                            columnId: "da0c7c03-da90-4e91-a254-3904e7e72554",
                            order: 0,
                            createdAt: "2026-01-12T18:14:06.736271",
                            updatedAt: null,
                        },
                        {
                            id: "ed770007-e837-41d0-95f8-450f62a842cf",
                            title: "Officiis ut temporibus natus neque aut doloribus consequatur. - En cours #2",
                            description: "Enim deserunt quaerat.",
                            status: "in_progress",
                            columnId: "da0c7c03-da90-4e91-a254-3904e7e72554",
                            order: 1,
                            createdAt: "2026-01-12T18:14:06.752041",
                            updatedAt: null,
                        },
                        {
                            id: "a87a251c-e711-47cc-8d8d-39bf2e5f54db",
                            title: "Voluptatem architecto magnam. - En cours #3",
                            description: "Omnis aperiam sed ut fugiat ipsam quo. Nam perferendis deleniti sint esse.",
                            status: "in_progress",
                            columnId: "da0c7c03-da90-4e91-a254-3904e7e72554",
                            order: 2,
                            createdAt: "2026-01-12T18:14:06.76811",
                            updatedAt: null,
                        },
                    ],
                },
                {
                    id: "f71537b4-56e0-4e25-acff-beaf40f4ca10",
                    name: "Terminé",
                    workspaceId: "1ad0d56c-73ef-4b5b-89bb-42e17028a6b9",
                    position: 2,
                    createdAt: "2026-01-12T18:14:06.578+00:00",
                    updatedAt: null,
                    tasks: [
                        {
                            id: "bb8aec38-830a-457b-baca-dd0c945483a8",
                            title: "Doloremque id dolore neque illo aperiam voluptatem nihil. - Terminé #1",
                            description:
                                "Consectetur explicabo exercitationem aut inventore necessitatibus. Mollitia aperiam recusandae soluta nesciunt.",
                            status: "done",
                            columnId: "f71537b4-56e0-4e25-acff-beaf40f4ca10",
                            order: 0,
                            createdAt: "2026-01-12T18:14:06.784746",
                            updatedAt: null,
                        },
                        {
                            id: "48d90c33-daba-4c58-a37e-6c486dd62d99",
                            title: "Neque dolores laudantium qui architecto minus molestiae nam. - Terminé #2",
                            description:
                                "Voluptatem maiores dignissimos ipsa dolor similique provident corporis. Illum aperiam illo eius vero corrupti temporibus accusamus officia. Aut atque explicabo recusandae nostrum laborum minus dolorum repellat delectus.",
                            status: "done",
                            columnId: "f71537b4-56e0-4e25-acff-beaf40f4ca10",
                            order: 1,
                            createdAt: "2026-01-12T18:14:06.801958",
                            updatedAt: null,
                        },
                    ],
                },
            ],
        },
    ];

    findAll(): Observable<Workspaces[]> {
        const basicWorkspaces = this._fullWorkspaces.map((w) => ({
            id: w.id,
            name: w.name,
            createdAt: w.createdAt,
            updatedAt: w.updatedAt,
            columns: [],
        }));

        return defer(() => new BehaviorSubject(basicWorkspaces).asObservable());
    }

    findOne(id: string): Observable<Workspaces> {
        const workspace = this._fullWorkspaces.find((w) => w.id === id) as Workspaces;
        if (!workspace) {
            throw new Error(`Workspace ${id} introuvable`);
        }
        return defer(() => new BehaviorSubject<Workspaces>(workspace).asObservable());
    }
}
