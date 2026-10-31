# Site-de-Notícias

## https://yanhausmann.github.io/Site-de-Noticias/

Site fictício de notícias, originalmente desenvolvido em HTML e CSS como exercício de front-end. Esta versão finaliza o projeto com uma redação completa para a cidade imaginária de **Vale Verde**, layout responsivo, acessibilidade, galeria de fotos e pequenas interações em JavaScript puro.

![Prévia da home do Notícias Cidade](img/preview.jpg)

## O que o site tem

- Home em três colunas e cinco editorias: Brasil, Internacional, Economia, Saúde e Ciência.
- 12 matérias completas com subtítulo, autoria, data, tempo de leitura, tags e "Leia também".
- Galeria de fotos com filtros por categoria e lightbox acessível.
- Newsletter de demonstração com validação de e-mail (nenhum dado é enviado).
- Páginas de créditos, erro 404, `sitemap.xml` e `robots.txt`.
- Layout fiel ao projeto original: logo, skyline, mapa do Brasil, paleta vermelha e azul, caixas com listras e tipografia Trebuchet MS.

## Como visualizar

Como o site é totalmente estático, basta abrir o `index.html` no navegador. Para testar com um servidor local:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Estrutura

```
index.html                 Home
brasil.html                Editoria Brasil
internacional.html         Editoria Internacional
economia.html              Editoria Economia
saude.html                 Editoria Saúde
ciencia.html               Editoria Ciência
fotos.html                 Galeria de fotos
creditos.html              Créditos, licenças e expediente
404.html                   Página de erro
*.html                     Matérias
css/estilo.css             Folha de estilo única, com media queries e estilos de impressão
js/app.js                  Newsletter, filtros da galeria, lightbox e ano do rodapé
img/                       Fotos, miniaturas, texturas e favicon
```

## Conteúdo fictício

Todos os textos, nomes, instituições, empresas e acontecimentos são inventados. O site foi criado para estudo e portfólio e não deve ser interpretado como notícia real. As imagens têm função ilustrativa; os créditos e as licenças estão em [creditos.html](https://yanhausmann.github.io/Site-de-Noticias/creditos.html).

## Tecnologias

HTML5 semântico, CSS Grid/Flexbox, JavaScript sem dependências e SVG para o favicon. Não há etapa de build, framework ou backend. O projeto é compatível com GitHub Pages.

## Créditos

Projeto original e desenvolvimento: **Yan F Hausmann**. Fotos novas: Wikimedia Commons, com licenças CC0 e CC BY-SA. As imagens de arquivo do projeto original aparecem creditadas como "acervo do projeto".
