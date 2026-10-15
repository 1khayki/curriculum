# Khayki Inocêncio — currículo e apresentação profissional

Site estático responsivo em português, sem dependências ou instalação. Inclui trajetória expansível, contatos diretos, editor em janela modal e versão para impressão/PDF.

## Executar

Na pasta `/workspace/curriculum`:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

## Personalizar

Use **Personalizar currículo** no rodapé, altere os campos e salve. Os dados ficam apenas no navegador atual e não são sincronizados nem publicados. E-mail, telefone e Instagram são atualizados a partir dos campos editados. **Currículo em PDF** abre a impressão do navegador; escolha salvar como PDF. Todas as experiências são incluídas, mesmo quando recolhidas no site.

Para alterações permanentes, edite `index.html`. A foto está em `assets/khayki.jpg`, extraída do currículo fornecido. Publique todos os arquivos do projeto, incluindo a pasta `assets`, em uma hospedagem estática.
