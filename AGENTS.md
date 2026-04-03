# AGENTS.md

## Objetivo

Este arquivo orienta agentes e colaboradores a fazer mudanças consistentes com as boas praticas atuais de Angular v21 neste repositório.

## Stack atual

- Angular `^21.2.0`
- Angular CLI `^21.2.3`
- Builder `@angular/build`
- TypeScript `~5.9.2`
- Testes com `Vitest`
- Aplicacao standalone com `bootstrapApplication`

## Principios para este projeto

- Mantenha o codigo simples, tipado e orientado a features.
- Preserve a abordagem standalone. Nao introduza `NgModule` em codigo novo sem necessidade real.
- Prefira APIs reativas modernas do Angular antes de padroes legados.
- Evite abstrair cedo demais. Comece com componentes, funcoes puras e servicos pequenos.
- Sempre preserve `strict`, `strictTemplates` e demais validacoes do projeto.

## Estrutura e organizacao

- Sempre que criar artefatos Angular novos, prefira usar comandos do Angular CLI (`ng generate`, `ng g`) em vez de criar arquivos manualmente, para preservar os padroes mais atuais do ecossistema e do workspace.
- Ao usar o Angular CLI, ajuste o resultado gerado apenas o necessario para alinhar com as convencoes deste repositório.
- Organize codigo por feature, nao por tipo tecnico global.
- Mantenha arquivos relacionados juntos na mesma pasta.
- Use um conceito principal por arquivo.
- Siga o style guide de filenames do Angular 20+: use nomes curtos em kebab-case que descrevam a feature, sem repetir o tipo tecnico no nome do arquivo.
- Prefira `user-profile.ts`, `user-profile.html`, `user-profile.scss` e `user-profile.spec.ts` em vez de `user-profile.component.ts`, `user-profile.service.ts`, `user-profile.directive.ts` ou variacoes semelhantes, salvo quando uma ferramenta do workspace exigir outro padrao.
- Evite nomes genericos como `utils.ts`, `helpers.ts` e `common.ts`.
- Siga nomes coerentes com o simbolo exportado e com o conjunto de arquivos da feature.

## Componentes

- Crie componentes standalone por padrao.
- Mantenha componentes focados em apresentacao e orquestracao leve de UI.
- Extraia regra de negocio, transformacoes complexas e integracoes para servicos ou funcoes puras.
- Prefira `changeDetection: ChangeDetectionStrategy.OnPush` em componentes novos, a menos que exista motivo claro para nao usar.
- Use membros `protected` quando forem acessados apenas pelo template.
- Marque como `readonly` propriedades inicializadas por Angular, como `input`, `model`, `output` e queries.

## Injeção de dependencias

- Prefira `inject()` em vez de constructor injection em codigo novo.
- Mantenha dependencias agrupadas no topo da classe.
- Prefira providers no menor escopo necessario, especialmente em rotas e features.

## Estado e reatividade

- Prefira `signal()` para estado local de componente.
- Prefira `computed()` para derivacoes de estado e para tirar logica do template.
- Use `linkedSignal()` quando precisar de estado gravavel dependente de outros sinais.
- Use `effect()` apenas para efeitos colaterais reais e integracao com APIs nao reativas.
- Nao use `effect()` para propagar estado entre sinais quando um `computed()` ou `linkedSignal()` resolver melhor.
- Leia sinais antes de fronteiras assincronas se a dependencia precisar ser rastreada.
- Continue usando RxJS quando o problema for naturalmente baseado em streams, cancelamento, combinacao de eventos ou interoperabilidade com bibliotecas.

## Inputs, outputs e API de componentes

- Prefira `input()` e `input.required()` em vez de `@Input()` para codigo novo.
- Use `output()` em vez de `EventEmitter` manual quando estiver criando eventos de componente.
- Use `model()` apenas quando o componente realmente representar edicao com two-way binding.
- Prefira inputs obrigatorios quando a ausencia do dado for invalida.
- Use `transform` em inputs apenas com funcoes puras e estaticamente analisaveis.
- Evite aliases sem necessidade real de compatibilidade.

## Templates

- Prefira a syntax moderna de controle de fluxo: `@if`, `@for`, `@switch` e `@defer`.
- Todo `@for` deve usar `track` estavel; prefira `id` ou `uuid`.
- Use `$index` apenas para listas estaticas.
- Mantenha expressoes de template simples. Se ficar dificil de ler, mova para `computed()`.
- Prefira bindings de `class` e `style` em vez de `ngClass` e `ngStyle`.
- Nomeie handlers pelo efeito causado, como `saveProduct()`, e nao pelo evento, como `handleClick()`.

## Roteamento e carregamento

- Defina rotas em arquivos dedicados de feature.
- Prefira `loadComponent` para telas standalone fora da rota inicial.
- Use lazy loading para areas nao criticas de entrada.
- Considere `@defer` para blocos pesados abaixo da dobra ou secundarios.
- Avalie preloading apenas quando houver beneficio real de UX.

## HTTP e acesso a dados

- Use `provideHttpClient()` e interceptors funcionais quando a feature precisar de HTTP.
- Para requisicoes tradicionais, `HttpClient` continua sendo a base padrao.
- `httpResource()` pode ser usado experimentalmente quando o fluxo signal-first trouxer ganho claro.
- Se usar `httpResource()`, deixe explicito no codigo que a API ainda e experimental no Angular.
- Valide e normalize dados de fronteira antes de espalha-los pelo app.

## Performance

- Evite computacao pesada dentro do template.
- Prefira listas com identidade estavel e componentes pequenos.
- Lazy load e `@defer` devem ser o caminho padrao para codigo nao essencial no primeiro paint.
- Considere modo zoneless apenas se toda a aplicacao e dependencias estiverem compativeis; nao migrar parcialmente sem revisar impactos.

## Estilos e UX

- Preserve o padrao de `scss` ja configurado no workspace.
- Prefira estilos encapsulados por feature/componente.
- Evite acoplamento excessivo entre markup e regras visuais globais.
- Garanta acessibilidade basica: semantica correta, labels, foco visivel e contraste adequado.

## Testes

- Toda logica nova relevante deve vir com teste unitario ou justificativa clara para ausencia.
- Teste comportamento observavel, nao detalhes internos.
- Para componentes, priorize cenarios de entrada, renderizacao e interacao.
- Para servicos e acesso HTTP, isole dependencias e teste fluxos de sucesso, erro e estados vazios.
- Ao mexer em sinais, teste derivacoes e efeitos visiveis ao usuario.

## O que evitar

- Nao introduzir `NgModule` em novas features sem motivo forte.
- Nao usar `any` sem justificativa objetiva.
- Nao colocar regra de negocio complexa em componentes ou templates.
- Nao usar `EventEmitter` como barramento generico de eventos.
- Nao usar `subscribe()` manual em componente quando `async`, sinais ou APIs de interoperabilidade resolverem melhor.
- Nao usar `ngClass` e `ngStyle` como padrao.
- Nao criar estrutura global `components/`, `services/`, `utils/` para tudo.

## Checklist para mudancas

- O codigo novo e standalone e orientado a feature?
- Inputs, outputs e estado usam APIs modernas do Angular quando apropriado?
- O template esta simples e com `track` correto em loops?
- A mudanca preserva tipagem estrita?
- Existe lazy loading ou `@defer` onde faz sentido?
- Existe teste cobrindo a parte nova ou alterada?

## Comandos uteis

```bash
npm start
npm run build
npm test
```

## Referencias oficiais

- https://angular.dev/style-guide
- https://angular.dev/guide/signals
- https://angular.dev/guide/components/inputs
- https://angular.dev/guide/templates/control-flow
- https://angular.dev/guide/templates/defer
- https://angular.dev/guide/routing/loading-strategies
- https://angular.dev/guide/zoneless
- https://angular.dev/guide/http/http-resource
