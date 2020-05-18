# HACKCOVID19 - Desafio 094

https://youtu.be/FPxED8I6tM8

https://devpost.com/software/volp

> Proposta do Desafio 094: CONECTAR PESSOAS E INSTITUIÇÕES DE CARIDADE
> Nesse momento muitas pessoas em situação informal de trabalho precisam de assistência. Os governos estão a garantir parcialmente isso, porém o valor pode não ser suficiente. Além disso há atrasos, filas e complicações. Existem diversas instituições de caridade, sejam ongs ou sejam igrejas, promovendo campanhas nas redes sociais tentando compartilhar ao máximo de pessoas possíveis. Seria interessante algum tipo de aplicativo onde pessoas interessadas em doar se cadastrassem e instituições que já realizam o trabalho também, para conectar. Seja por tags do tipo de ajuda, seja geograficamente. Com ajuda material, financeira ou voluntariando fisicamente. Essas instituições não tem fundos para promover nas redes sociais.
_proposta enviada por Guilherme Vieira de Abreu e Silva_


## Inspiração
Em tempos de pandemia do COVID-19 vimos muitas pessoas passando necessidade e muitas pessoas querendo ajudar. Por isso pensamos em alguma forma de conectar essas pessoas

## What it does
Instituições de caridade podem se vincular a nossa plataforma e promover suas informações e serviços para que consigam ajudar ainda mais pessoas necessitadas.

Além disso, pessoas carentes ou pessoas (principalmente as de risco) na quarentena pelo COVID-19 podem solicitar ajuda para que os ajudantes possam verificar sua solicitação e aceitar a mesma. A solicitação de ajuda pode ser remunerada ou doada.


## How we built it
Nós criamos uma PWA (progress Web App) em Angular 9, com um backend em Node Express e Typescript, uma base em Postgres, push notifications com Firebase e Geolocalização usando open street maps (OSM Apis) e verificação de código SMS usando a API do Twilio


## Challenges we ran into
Nossa plataforma possui diversas funcionalidades e interações. Logo, construir esse sistema em 3 dias foi bem desafiador.

Criação de diversas regras para que o usuário não envie serviços sem a real necessidade (abusando dos recursos e do ecossistema colaborativo que a plataforma oferece).

## Accomplishments that we're proud of
Através de um exemplo de trabalho em equipe e ajuda entre os hackers conseguimos entregar um mínimo produto viável incrível para se validado no mercado.

## What we learned
Aprendemos a trabalhar com um cronograma muito curto e um escopo grande. Grandes desafios na criação, automatização do mapa e criação de notificações push para comunição entre ajudantes e ajudados.

## What's next for VOLP
- Um sistema administrador para validar as ONGs fazendo com que todas as informações do sistema sejam autênticas.

- Um sistema administrador que vai gerenciar todas as ONGs cadastradas e dar o suporte necessário para a sua projeção.

- Os usuários cadastrados poderão registrar incidentes, efeito WAZE. Esses incidentes são: exibir áreas de grande aglomeração, mercados sem suprimentos, upas lotadas e muitos outros.

- As ONGs poderão criar campanhas para conseguir as ajudas sobre as atividades que necessita.

- As ONGs poderão adicionar ajudantes próprios, dessa forma podemos verificar que as ONGs estão efetuando um trabalho de forma efetiva para ajudar sua comunidade.

- Cada pessoa que contribuir dentro da plataforma será avaliado de acordo com o serviço feito e poderá avaliar a ONG para qual fez o serviço.
