/* Shared theme switch for index.html + concept.html: one choice, remembered per browser.
   Defaults to the OS preference; storage failures (private mode, file://) are ignored. */
(function(){
  var KEY='atrium-theme', root=document.documentElement, t=null;
  try{ t=localStorage.getItem(KEY); }catch(e){}
  if(t===null && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) t='dark';
  function apply(v){ if(v) root.setAttribute('data-theme',v); else root.removeAttribute('data-theme'); }
  apply(t);
  document.addEventListener('DOMContentLoaded',function(){
    var sel=document.getElementById('themeSel'); if(!sel) return;
    sel.value=t||'';
    sel.addEventListener('change',function(){ apply(sel.value); try{ localStorage.setItem(KEY,sel.value); }catch(e){} });
  });
})();
