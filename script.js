const fields = [...document.querySelectorAll('[data-field]')];
const editor = document.querySelector('#editor');
const form = document.querySelector('#editor-form');
const editorFields = document.querySelector('#editor-fields');
const status = document.querySelector('#status');
const storageKey = 'meu-curriculo-v1';
let toastTimer;
function announce(message) {
  clearTimeout(toastTimer);
  status.textContent = message;
  toastTimer = setTimeout(() => { status.textContent = ''; }, 6500);
}
function value(key) { return fields.find(field => field.dataset.field === key)?.textContent.trim() || ''; }
function updateContacts() {
  const email = value('email');
  document.querySelector('#email-link').href = `mailto:${encodeURIComponent(email)}`;
  document.querySelector('#phone-link').href = `tel:${value('phone').replace(/[^+\d]/g, '')}`;
  const handle = value('website').replace(/^@/, '');
  const socialLink = document.querySelector('#social-link');
  if (/^[a-zA-Z0-9._]{1,30}$/.test(handle)) socialLink.href = `https://www.instagram.com/${handle}/`;
  else socialLink.removeAttribute('href');
}
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
  for (const field of fields) if (typeof saved?.[field.dataset.field] === 'string') field.textContent = saved[field.dataset.field];
} catch { announce('Não foi possível recuperar suas alterações neste navegador.'); }
updateContacts();
document.querySelector('#year').textContent = new Date().getFullYear();
const labels = {name:'Nome',intro:'Apresentação',email:'E-mail',phone:'Telefone',location:'Cidade e estado',website:'Usuário do Instagram',about:'Perfil profissional',certificate:'Curso complementar',language1:'Idioma principal',level1:'Nível',language2:'Outros idiomas',level2:'Nível',result1:'Destaque da experiência recente',result2:'Outro destaque',course:'Pós-graduação',school:'Instituição',schooldate:'Conclusão',course2:'Graduação',school2:'Instituição',schooldate2:'Conclusão'};
function fieldLabel(key) {
  if (labels[key]) return labels[key];
  const prefixes = {job:'Cargo',company:'Empresa',date:'Período',description:'Atuação',skill:'Competência',cert:'Curso complementar'};
  return prefixes[key.replace(/\d+$/, '')] || key;
}
function group(key) {
  if (/^(job|company|date|description|result)/.test(key)) return 'Experiência profissional';
  if (/^(course|school|cert)/.test(key)) return 'Formação e cursos';
  if (/^(skill|language|level)/.test(key)) return 'Competências e idiomas';
  return 'Perfil e contato';
}
document.querySelector('#edit').addEventListener('click', () => {
  editorFields.replaceChildren();
  const groups = new Map();
  for (const field of fields) {
    const key = field.dataset.field;
    const title = group(key);
    if (!groups.has(title)) {
      const details = document.createElement('details');
      details.open = groups.size === 0;
      const summary = document.createElement('summary');
      summary.textContent = title;
      details.append(summary);
      groups.set(title, details);
      editorFields.append(details);
    }
    const label = document.createElement('label');
    label.htmlFor = `input-${key}`;
    label.textContent = fieldLabel(key) + (/\d$/.test(key) ? ` ${key.match(/\d+$/)[0]}` : '');
    const input = document.createElement(/^(intro|about|description|result)/.test(key) ? 'textarea' : 'input');
    input.id = `input-${key}`;
    input.name = key;
    input.value = field.textContent;
    input.maxLength = input.tagName === 'TEXTAREA' ? 3000 : 250;
    input.required = true;
    if (key === 'email') input.type = 'email';
    if (key === 'phone') input.type = 'tel';
    groups.get(title).append(label, input);
  }
  editor.showModal();
  editor.scrollTop = 0;
});
for (const button of document.querySelectorAll('.close-editor')) button.addEventListener('click', () => editor.close());
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  for (const field of fields) if (typeof data[field.dataset.field] === 'string') field.textContent = data[field.dataset.field].trim();
  updateContacts();
  editor.close();
  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
    announce('Currículo atualizado. Alterações salvas neste navegador.');
  } catch { announce('Currículo atualizado. O navegador não permitiu salvar os dados; gere um PDF para guardar.'); }
});
document.querySelector('.copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(value('email'));
    announce('E-mail copiado!');
  } catch { announce(`Copie este e-mail: ${value('email')}`); }
});
let closedBeforePrint = [];
window.addEventListener('beforeprint', () => {
  closedBeforePrint = [...document.querySelectorAll('.job:not([open])')];
  for (const detail of closedBeforePrint) detail.open = true;
});
window.addEventListener('afterprint', () => {
  for (const detail of closedBeforePrint) detail.open = false;
  closedBeforePrint = [];
});
for (const button of document.querySelectorAll('.print-action')) button.addEventListener('click', () => window.print());
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('nav a')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      for (const link of links) {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      }
    }
  }, {rootMargin:'-15% 0px -50% 0px',threshold:0});
  for (const id of ['sobre','experiencia','formacao','contato']) observer.observe(document.getElementById(id));
}
