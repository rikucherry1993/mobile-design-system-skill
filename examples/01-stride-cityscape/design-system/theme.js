/* Shared theme switch for index.html + concept.html + icons.html: one choice, remembered per browser.
   Stride is DARK-FIRST: :root is dark; "light" is the opt-in override. Storage failures are ignored. */
(function(){
  var KEY='stride-theme', root=document.documentElement, t='';
  try{ t=localStorage.getItem(KEY)||''; }catch(e){}
  function apply(v){ if(v) root.setAttribute('data-theme',v); else root.removeAttribute('data-theme'); }
  apply(t);
  document.addEventListener('DOMContentLoaded',function(){
    var sel=document.getElementById('themeSel'); if(!sel) return;
    sel.value=t;
    sel.addEventListener('change',function(){ apply(sel.value); try{ localStorage.setItem(KEY,sel.value); }catch(e){} });
  });
})();
