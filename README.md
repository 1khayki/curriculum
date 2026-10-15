# Khayki Inocêncio — site profissional

Site em português, com páginas independentes e sem dependências de execução.

## Páginas e arquivos

- `index.html`: apresentação, retrato e caminhos para conhecer o trabalho.
- `experiencias.html`: seis experiências profissionais, com descrições expansíveis.
- `biografia.html`: biografia profissional baseada no currículo, formação, cursos e idiomas.
- `curriculo.html`: versão completa para impressão e PDF, acessível pelos botões de PDF.
- `style.css`: cores, fontes, layout e adaptações para celular e impressão.
- `script.js`: editor, contatos, persistência local e impressão.
- `assets/khayki.jpg`: foto extraída do currículo fornecido.

Os arquivos contêm comentários com orientações para edição. As páginas compartilham os mesmos arquivos de estilo e funções.

## Executar

Na pasta do projeto:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

## Personalizar

Use **Personalizar currículo** no rodapé de cada página. O editor mostra os campos daquela página. As alterações ficam apenas no navegador atual e são preservadas ao navegar entre as páginas. Para conferir o conteúdo público sem alterações locais, use uma janela anônima.

**Currículo em PDF** leva à versão completa e abre a impressão do navegador. Todas as experiências são incluídas, mesmo quando recolhidas na tela.

## Editar o conteúdo público no GitHub

1. Abra o arquivo da página que deseja alterar.
2. Clique no lápis e siga os comentários dentro do código.
3. Preserve os atributos `id`, `class` e `data-field`.
4. Confirme a alteração com **Commit changes**.
5. O GitHub Pages publica a atualização a partir da branch configurada.

Alguns dados aparecem em mais de uma página: atualize o contato nas quatro páginas e mantenha o perfil, as experiências e a formação de `curriculo.html` alinhados com as respectivas páginas. Os dados do editor local com o mesmo `data-field` são compartilhados pelo navegador.

Para publicar, inclua todos os arquivos HTML, `style.css`, `script.js`, `.nojekyll` e a pasta `assets`. Os links são relativos para funcionar também em um subdiretório do GitHub Pages.
