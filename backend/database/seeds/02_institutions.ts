import * as Knex from "knex";

const TABLE_NAME = "institution";

export async function seed(knex: Knex): Promise<void> {
    await knex(TABLE_NAME).del();
    await knex.schema.raw(`ALTER SEQUENCE ${TABLE_NAME}_id_seq RESTART WITH 1000`);
    return knex(TABLE_NAME).insert([
        {
            id: 1,
            name: "Ceu Azul",
            unique_document: "12345678000100",
            owner_id: 5,
            description: `*Ajudamos a quem mais precisa!*
Começamos em 1990 e até hoje ajudamos milhões de pessoas.

*Precisamos:*
- Doações em Dinheiro
- Alimentos não perecíveis
- Fraldas`,
            bank_info: `Por favor utilize uma de nossas contas abaixo para depósito:
*Bradesco*
CC 1234412/8
Nome: Ana Maria
CNPJ: 12345678000100

*Banco do Brasil*
CC 1234477/8
Nome: Joao Lopes
CPF: 12345678901`,
            profile_picture: "https://picsum.photos/80",
            website_url: "https://ceu-azul-hackcovid19-volp.com",
        },
        {
            id: 2,
            name: "Casa St. André",
            unique_document: "12345678000200",
            owner_id: 6,
            description: `Esperança!
*Ajudamos a quem mais precisa!*
Começamos em 1975 e até hoje ajudamos milhões de idosos.

*Doações aceitas:*
- Serviços de Entretenimento
- Serviços de Saúde
- Fraldas Geriátricas
- Serviços de Manutenção
- Alimentos não perecíveis
- Serviços de Tecnologia`,
            bank_info: `Por favor, colabore doando os serviços e produtos listados acima.`,
            profile_picture: "https://picsum.photos/80",
            website_url: "https://casa-st-andre-hackcovid19-volp.com",
        },
        {
            id: 3,
            name: "Igreja Dois Irmãos",
            unique_document: "12345678000300",
            owner_id: 7,
            description: `Vamos ajudar todos nessa situação de calamidade mundial!

Deus está conosco!
            `,
            bank_info: `Nossas contas estão cadastradas com os dados da própria igreja:
Nome: Igreja Dois Irmãos
CNPJ 12.345.678/0003-00

*Santander*
CC 1234455/8

*Banco Itaú*
CC 1234456/8`,
            profile_picture: "https://picsum.photos/80",
            website_url: "https://igreja-dois-irmaos-hackcovid19-volp.com",
        },
    ]);
}
