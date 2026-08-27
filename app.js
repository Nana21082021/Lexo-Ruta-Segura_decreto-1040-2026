
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const path = location.pathname.split('/').pop() || 'index.html';
$$('.menu a').forEach(a=>{
  if(a.getAttribute('href') === path) a.classList.add('active');
});

const mobile = $('#mobileNav');
if(mobile){
  mobile.addEventListener('change', e=>{
    if(e.target.value) location.href=e.target.value;
  });
}

// Classifier
const classifier = $('#classifier');
if(classifier){
  let history = ['q0'];
  const show = (id) => {
    $$('.question', classifier).forEach(q=>q.classList.remove('active'));
    $$('.result', classifier).forEach(r=>r.classList.remove('active'));
    const el = $('#'+id);
    if(el) el.classList.add('active');
    const n = Math.min(history.length, 6);
    $('#progressBar').style.width = Math.min(100, n*17)+'%';
    window.scrollTo({top:classifier.offsetTop-90, behavior:'smooth'});
  };
  $$('.option', classifier).forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const next = btn.dataset.next;
      if(!next) return;
      history.push(next);
      show(next);
    });
  });
  $$('.restart', classifier).forEach(btn=>{
    btn.addEventListener('click', ()=>{
      history=['q0'];
      show('q0');
    });
  });
}
