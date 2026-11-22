(function(){
const menu=document.querySelector('[data-menu]');const nav=document.querySelector('[data-nav]');
if(menu&&nav){menu.addEventListener('click',()=>{let isOpen=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(isOpen));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));}
const form=document.getElementById('lead-form');
if(form){form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;
const d=new FormData(form);const get=k=>String(d.get(k)||'').trim();
const lines=['Buongiorno Schipani Auto, vorrei richiedere una valutazione per la trasformazione in macchina operatrice (targa gialla).','','*DATI RICHIEDENTE*',`Nome: ${get('nome')}`,`Telefono: ${get('telefono')}`,`Provincia: ${get('provincia')}`,'','*DATI DEL VEICOLO*',`Marca e modello: ${get('modello')}`,`Anno prima immatricolazione: ${get('anno')}`,`Tipologia veicolo: ${get('tipologia')}`,`Utilizzo previsto: ${get('uso')}`,`Note: ${get('note')||'Nessuna'}`,'','Chiedo di essere ricontattato per verificare fattibilità e iter.'];
const params=new URLSearchParams(location.search);const src=params.get('utm_source');if(src)lines.push(`Provenienza richiesta: ${src}`);
const url='https://wa.me/393398171599?text='+encodeURIComponent(lines.join('\n'));
const w=window.open(url,'_blank','noopener,noreferrer');if(!w)location.href=url;
});}
})();
